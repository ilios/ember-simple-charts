import "./simple-chart.css"
import Component from '@glimmer/component';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { assert } from '@ember/debug';
import SimpleChartBar from './simple-chart-bar.js';
import SimpleChartCluster from './simple-chart-cluster.js';
import SimpleChartDonut from './simple-chart-donut.js';
import SimpleChartHorzBar from './simple-chart-horz-bar.js';
import SimpleChartPack from './simple-chart-pack.js';
import SimpleChartPie from './simple-chart-pie.js';
import SimpleChartTree from './simple-chart-tree.js';
import SimpleChartBox from './simple-chart-box.js';
import SimpleChartTooltip from './simple-chart-tooltip.js';
import timeout from '../utils/timeout.js';
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
  calculateSize = async ({
    contentRect: {
      width,
      height
    }
  }) => {
    if (this.height && this.width) {
      await timeout(DEBOUNCE_MS, this);
    }
    if (!(isDestroyed(this) || isDestroying(this))) {
      this.height = Math.floor(height);
      this.width = Math.floor(width);
    }
  };
  handleHover = async (data, tooltipTarget) => {
    await timeout(DEBOUNCE_MS, this);
    if (this.args.hover) {
      try {
        await this.args.hover(data);
        if (!(isDestroyed(this) || isDestroying(this))) {
          this.tooltipTarget = tooltipTarget;
        }
      } catch {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  };
  handleLeave = async () => {
    await timeout(DEBOUNCE_MS, this);
    if (this.args.leave) {
      try {
        await this.args.leave();
        if (!(isDestroyed(this) || isDestroying(this))) {
          this.tooltipTarget = null;
        }
      } catch {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  };
  handleClick = async data => {
    await timeout(DEBOUNCE_MS, this);
    if (this.args.onClick) {
      try {
        await this.args.onClick(data);
        if (!(isDestroyed(this) || isDestroying(this))) {
          this.tooltipTarget = null;
        }
      } catch {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  };
  static {
    setComponentTemplate(precompileTemplate("<div class=\"simple-chart\" {{onResize this.calculateSize}}>\n  <this.chartComponent @data={{@data}} @isIcon={{this.isIcon}} @hover={{this.handleHover}} @onClick={{this.handleClick}} @leave={{this.handleLeave}} @isClickable={{this.isClickable}} @containerHeight={{this.height}} @containerWidth={{this.width}} @textIsNotOutlined={{this.textIsNotOutlined}} />\n  {{#if this.tooltipTarget}}\n    {{yield (hash tooltip=(component SimpleChartTooltip target=this.tooltipTarget title=null))}}\n  {{/if}}\n</div>", {
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
