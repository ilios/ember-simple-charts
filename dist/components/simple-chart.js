import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import Component from '@glimmer/component';
import { timeout, taskGroup } from 'ember-concurrency';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { ensureSafeComponent } from '@embroider/util';
import SimpleChartBar from './simple-chart-bar.js';
import SimpleChartCluster from './simple-chart-cluster.js';
import SimpleChartDonut from './simple-chart-donut.js';
import SimpleChartHorzBar from './simple-chart-horz-bar.js';
import SimpleChartPack from './simple-chart-pack.js';
import SimpleChartPie from './simple-chart-pie.js';
import SimpleChartTree from './simple-chart-tree.js';
import SimpleChartBox from './simple-chart-box.js';
import './simple-chart.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"simple-chart\"\n  {{on-resize (perform this.calculateSize)}}\n>\n  <this.chartComponent\n    @data={{@data}}\n    @isIcon={{this.isIcon}}\n    @hover={{perform this.handleHover}}\n    @onClick={{perform this.handleClick}}\n    @leave={{perform this.handleLeave}}\n    @isClickable={{this.isClickable}}\n    @containerHeight={{this.height}}\n    @containerWidth={{this.width}}\n  />\n  {{#if this.tooltipTarget}}\n    {{yield\n      (hash\n        tooltip=(component \"simple-chart-tooltip\" target=this.tooltipTarget title=null)\n      )\n    }}\n  {{/if}}\n</div>\n");

const DEBOUNCE_MS = 100;
class SimpleChart extends Component {
  static {
    g(this.prototype, "height", [tracked]);
  }
  #height = (i(this, "height"), undefined);
  static {
    g(this.prototype, "width", [tracked]);
  }
  #width = (i(this, "width"), undefined);
  static {
    g(this.prototype, "tooltipTarget", [tracked]);
  }
  #tooltipTarget = (i(this, "tooltipTarget"), undefined);
  get chartComponent() {
    const charts = {
      bar: SimpleChartBar,
      cluster: SimpleChartCluster,
      donut: SimpleChartDonut,
      'horz-bar': SimpleChartHorzBar,
      pack: SimpleChartPack,
      pie: SimpleChartPie,
      tree: SimpleChartTree,
      box: SimpleChartBox
    };
    assert(`${this.args.name} is a valid chart`, Object.keys(charts).includes(this.args.name));
    return ensureSafeComponent(charts[this.args.name], this);
  }
  get isIcon() {
    return Boolean(this.args.isIcon);
  }
  get isClickable() {
    return !!this.args.onClick;
  }
  calculateSize = buildTask(() => ({
    context: this,
    generator: function* ({
      contentRect: {
        width,
        height
      }
    }) {
      if (this.height && this.width) {
        yield timeout(250);
      }
      this.height = Math.floor(height);
      this.width = Math.floor(width);
    }
  }), null, "calculateSize", "restartable");
  static {
    g(this.prototype, "mouseGroup", [taskGroup]);
  }
  #mouseGroup = (i(this, "mouseGroup"), undefined);
  handleHover = buildTask(() => ({
    context: this,
    generator: function* (data, tooltipTarget) {
      yield timeout(DEBOUNCE_MS);
      if (this.args.hover) {
        try {
          yield this.args.hover(data);
          if (!(isDestroyed(this) || isDestroying(this))) {
            this.tooltipTarget = tooltipTarget;
          }
        } catch (e) {
          //we will just ignore errors here since the mouse state is transient
        }
      }
    }
  }), {
    group: 'mouseGroup'
  }, "handleHover", null);
  handleLeave = buildTask(() => ({
    context: this,
    generator: function* () {
      yield timeout(DEBOUNCE_MS);
      if (this.args.leave) {
        try {
          yield this.args.leave();
          if (!(isDestroyed(this) || isDestroying(this))) {
            this.tooltipTarget = null;
          }
        } catch (e) {
          //we will just ignore errors here since the mouse state is transient
        }
      }
    }
  }), {
    group: 'mouseGroup'
  }, "handleLeave", null);
  handleClick = buildTask(() => ({
    context: this,
    generator: function* (data) {
      if (this.args.onClick) {
        try {
          yield this.args.onClick(data);
          if (!(isDestroyed(this) || isDestroying(this))) {
            this.tooltipTarget = null;
          }
        } catch (e) {
          //we will just ignore errors here since the mouse state is transient
        }
      }
    }
  }), {
    group: 'mouseGroup'
  }, "handleClick", null);
}
setComponentTemplate(TEMPLATE, SimpleChart);

export { SimpleChart as default };
//# sourceMappingURL=simple-chart.js.map
