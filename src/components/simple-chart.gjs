import Component from '@glimmer/component';
import { isDestroying, isDestroyed } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { assert } from '@ember/debug';
import SimpleChartBar from './simple-chart-bar.gjs';
import SimpleChartCluster from './simple-chart-cluster.gjs';
import SimpleChartDonut from './simple-chart-donut.gjs';
import SimpleChartHorzBar from './simple-chart-horz-bar.gjs';
import SimpleChartPack from './simple-chart-pack.gjs';
import SimpleChartPie from './simple-chart-pie.gjs';
import SimpleChartTree from './simple-chart-tree.gjs';
import SimpleChartBox from './simple-chart-box.gjs';
import SimpleChartTooltip from './simple-chart-tooltip.gjs';
import timeout from '../utils/timeout.js';

import './simple-chart.css';

const DEBOUNCE_MS = 100;
import { onResize } from 'ember-primitives/on-resize';

export default class SimpleChart extends Component {
  @tracked height;
  @tracked width;
  @tracked tooltipTarget;

  get chartComponent() {
    const charts = {
      bar: SimpleChartBar,
      cluster: SimpleChartCluster,
      donut: SimpleChartDonut,
      'horz-bar': SimpleChartHorzBar,
      pack: SimpleChartPack,
      pie: SimpleChartPie,
      tree: SimpleChartTree,
      box: SimpleChartBox,
    };
    assert(
      `${this.args.name} is a valid chart`,
      Object.keys(charts).includes(this.args.name),
    );

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

  calculateSize = async ({ contentRect: { width, height } }) => {
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

  handleClick = async (data) => {
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

  <template>
    <div class="simple-chart" {{onResize this.calculateSize}}>
      <this.chartComponent
        @data={{@data}}
        @isIcon={{this.isIcon}}
        @hover={{this.handleHover}}
        @onClick={{this.handleClick}}
        @leave={{this.handleLeave}}
        @isClickable={{this.isClickable}}
        @containerHeight={{this.height}}
        @containerWidth={{this.width}}
        @textIsNotOutlined={{this.textIsNotOutlined}}
      />
      {{#if this.tooltipTarget}}
        {{yield
          (hash
            tooltip=(component
              SimpleChartTooltip target=this.tooltipTarget title=null
            )
          )
        }}
      {{/if}}
    </div>
  </template>
}
