import "./simple-chart.css"
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { assert } from '@ember/debug';
import { timeout } from 'ember-concurrency';
import SimpleChartBar from './simple-chart-bar.js';
import SimpleChartCluster from './simple-chart-cluster.js';
import SimpleChartDonut from './simple-chart-donut.js';
import SimpleChartHorzBar from './simple-chart-horz-bar.js';
import SimpleChartPack from './simple-chart-pack.js';
import SimpleChartPie from './simple-chart-pie.js';
import SimpleChartTree from './simple-chart-tree.js';
import SimpleChartBox from './simple-chart-box.js';
import SimpleChartTooltip from './simple-chart-tooltip.js';
import { waitForPromise } from '@ember/test-waiters';
import { onResize } from 'ember-primitives/on-resize';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

;

const DEBOUNCE_MS = 100;
class SimpleChart extends Component {
  static {
    g(this.prototype, "height", [tracked]);
  }
  #height = (i(this, "height"), void 0);
  static {
    g(this.prototype, "width", [tracked]);
  }
  #width = (i(this, "width"), void 0);
  static {
    g(this.prototype, "tooltipTarget", [tracked]);
  }
  #tooltipTarget = (i(this, "tooltipTarget"), void 0);
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
    return charts[this.args.name];
  }
  get isIcon() {
    return Boolean(this.args.isIcon);
  }
  get isClickable() {
    return !!this.args.onClick;
  }
  get textIsNotOutlined() {
    return this.args.textIsNotOutlined ?? false;
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
        yield timeout(DEBOUNCE_MS);
      }
      this.height = Math.floor(height);
      this.width = Math.floor(width);
    }
  }), null, "calculateSize", "restartable");
  handleHover = buildTask(() => ({
    context: this,
    generator: function* (data, tooltipTarget) {
      yield timeout(DEBOUNCE_MS);
      if (this.args.hover) {
        assert('@hover must be a function', typeof this.args.hover === 'function');
        try {
          yield waitForPromise(Promise.try(this.args.hover, data));
          this.tooltipTarget = tooltipTarget;
        } catch {
          //we will just ignore errors here since the mouse state is transient
        }
      }
    }
  }), null, "handleHover", "restartable");
  handleLeave = buildTask(() => ({
    context: this,
    generator: function* () {
      yield timeout(DEBOUNCE_MS);
      if (this.args.leave) {
        assert('@leave must be a function', typeof this.args.leave === 'function');
        try {
          yield waitForPromise(Promise.try(this.args.leave));
          this.tooltipTarget = null;
        } catch {
          //we will just ignore errors here since the mouse state is transient
        }
      }
    }
  }), null, "handleLeave", "restartable");
  handleClick = buildTask(() => ({
    context: this,
    generator: function* (data) {
      yield timeout(DEBOUNCE_MS);
      if (this.args.onClick) {
        assert('@onClick must be a function', typeof this.args.onClick === 'function');
        try {
          yield waitForPromise(Promise.try(this.args.onClick, data));
          this.tooltipTarget = null;
        } catch {
          //we will just ignore errors here since the mouse state is transient
        }
      }
    }
  }), null, "handleClick", null);
  static {
    setComponentTemplate(precompileTemplate("<div class=\"simple-chart\" {{onResize this.calculateSize.perform}}>\n  <this.chartComponent @data={{@data}} @isIcon={{this.isIcon}} @hover={{this.handleHover.perform}} @onClick={{this.handleClick.perform}} @leave={{this.handleLeave.perform}} @isClickable={{this.isClickable}} @containerHeight={{this.height}} @containerWidth={{this.width}} @textIsNotOutlined={{this.textIsNotOutlined}} ...attributes />\n  {{#if this.tooltipTarget}}\n    {{yield (hash tooltip=(component SimpleChartTooltip target=this.tooltipTarget title=null))}}\n  {{/if}}\n</div>", {
      strictMode: true,
      scope: () => ({
        onResize,
        hash,
        SimpleChartTooltip
      })
    }), this);
  }
}

export { SimpleChart as default };
//# sourceMappingURL=simple-chart.js.map
