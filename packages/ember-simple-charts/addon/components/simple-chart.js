import Component from '@glimmer/component';
import { timeout, task, taskGroup, restartableTask } from 'ember-concurrency';
import { isDestroying, isDestroyed } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { ensureSafeComponent } from '@embroider/util';
import SimpleChartBar from './simple-chart-bar';
import SimpleChartCluster from './simple-chart-cluster';
import SimpleChartDonut from './simple-chart-donut';
import SimpleChartHorzBar from './simple-chart-horz-bar';
import SimpleChartPack from './simple-chart-pack';
import SimpleChartPie from './simple-chart-pie';
import SimpleChartTree from './simple-chart-tree';
import SimpleChartBox from './simple-chart-box';

const DEBOUNCE_MS = 100;
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

    return ensureSafeComponent(charts[this.args.name], this);
  }
  get isIcon() {
    return Boolean(this.args.isIcon);
  }

  get isClickable() {
    return !!this.args.onClick;
  }

  calculateSize = restartableTask(
    async ({ contentRect: { width, height } }) => {
      if (this.height && this.width) {
        await timeout(250);
      }
      this.height = Math.floor(height);
      this.width = Math.floor(width);
    },
  );

  @taskGroup mouseGroup;

  handleHover = task({ group: 'mouseGroup' }, async (data, tooltipTarget) => {
    await timeout(DEBOUNCE_MS);
    if (this.args.hover) {
      try {
        await this.args.hover(data);
        if (!(isDestroyed(this) || isDestroying(this))) {
          this.tooltipTarget = tooltipTarget;
        }
      } catch (e) {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  });

  handleLeave = task({ group: 'mouseGroup' }, async () => {
    await timeout(DEBOUNCE_MS);
    if (this.args.leave) {
      try {
        await this.args.leave();
        if (!(isDestroyed(this) || isDestroying(this))) {
          this.tooltipTarget = null;
        }
      } catch (e) {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  });

  handleClick = task({ group: 'mouseGroup' }, async (data) => {
    if (this.args.onClick) {
      try {
        await this.args.onClick(data);
        if (!(isDestroyed(this) || isDestroying(this))) {
          this.tooltipTarget = null;
        }
      } catch (e) {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  });
}
