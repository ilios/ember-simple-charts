import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { assert } from '@ember/debug';
import { task, timeout } from 'ember-concurrency';
import SimpleChartBar from './simple-chart-bar.gjs';
import SimpleChartCluster from './simple-chart-cluster.gjs';
import SimpleChartDonut from './simple-chart-donut.gjs';
import SimpleChartHorzBar from './simple-chart-horz-bar.gjs';
import SimpleChartPack from './simple-chart-pack.gjs';
import SimpleChartPie from './simple-chart-pie.gjs';
import SimpleChartTree from './simple-chart-tree.gjs';
import SimpleChartBox from './simple-chart-box.gjs';
import SimpleChartTooltip from './simple-chart-tooltip.gjs';

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

  calculateSize = task(async ({ contentRect: { width, height } }) => {
    if (this.height && this.width) {
      await timeout(DEBOUNCE_MS);
    }
    this.height = Math.floor(height);
    this.width = Math.floor(width);
  });

  handleHover = task(async (data, tooltipTarget) => {
    await timeout(DEBOUNCE_MS);
    if (this.args.hover) {
      assert(
        '@hover must be a function',
        typeof this.args.hover === 'function',
      );
      try {
        await this.args.hover(data);
        this.tooltipTarget = tooltipTarget;
      } catch (e) {
        console.error(e);
        //we will just ignore errors here since the mouse state is transient
      }
    }
  });

  handleLeave = task(async () => {
    await timeout(DEBOUNCE_MS);
    if (this.args.leave) {
      assert(
        '@leave must be a function',
        typeof this.args.leave === 'function',
      );
      try {
        await this.args.leave();
        this.tooltipTarget = null;
      } catch (e) {
        console.error(e);
        //we will just ignore errors here since the mouse state is transient
      }
    }
  });

  handleClick = task(async (data) => {
    await timeout(5000);
    if (this.args.onClick) {
      assert(
        '@onClick must be a function',
        typeof this.args.onClick === 'function',
      );
      try {
        console.log(this.args.onClick);
        await this.args.onClick(data);
        console.log('done');

        this.tooltipTarget = null;
      } catch (e) {
        console.error(e);
        //we will just ignore errors here since the mouse state is transient
      }
    }
  });

  <template>
    <div class="simple-chart" {{onResize this.calculateSize.perform}}>
      <this.chartComponent
        @data={{@data}}
        @isIcon={{this.isIcon}}
        @hover={{this.handleHover.perform}}
        @onClick={{this.handleClick.perform}}
        @leave={{this.handleLeave.perform}}
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
