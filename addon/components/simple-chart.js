import Component from '@glimmer/component';
import { timeout, task, taskGroup } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { ensureSafeComponent } from '@embroider/util';
import SimpleChartBar from './simple-chart-bar';
import SimpleChartCluster from './simple-chart-cluster';
import SimpleChartDonut from './simple-chart-donut';
import SimpleChartHorzBar from './simple-chart-horz-bar';
import SimpleChartPack from './simple-chart-pack';
import SimpleChartPie from './simple-chart-pie';
import SimpleChartTree from './simple-chart-tree';

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
    };
    assert(
      `${this.args.name} is a valid chart`,
      Object.keys(charts).includes(this.args.name)
    );

    return ensureSafeComponent(charts[this.args.name], this);
  }
  get isIcon() {
    return Boolean(this.args.isIcon);
  }

  get isClickable() {
    return !!this.args.onClick;
  }
  @action
  calculateSize(element) {
    const rect = element.getBoundingClientRect();
    const { height, width } = rect;
    this.height = Math.floor(height);
    this.width = Math.floor(width);
  }
  @taskGroup mouseGroup;
  @task({ group: 'mouseGroup' })
  *handleHover(data, tooltipTarget) {
    yield timeout(DEBOUNCE_MS);
    if (this.args.hover) {
      try {
        yield this.args.hover(data);
        if (!(this.isDestroyed || this.isDestroying)) {
          this.tooltipTarget = tooltipTarget;
        }
      } catch (e) {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  }
  @task({ group: 'mouseGroup' })
  *handleLeave() {
    yield timeout(DEBOUNCE_MS);
    if (this.args.leave) {
      try {
        yield this.args.leave();
        if (!(this.isDestroyed || this.isDestroying)) {
          this.tooltipTarget = null;
        }
      } catch (e) {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  }
  @task({ group: 'mouseGroup' })
  *handleClick(data) {
    if (this.args.onClick) {
      try {
        yield this.args.onClick(data);
        if (!(this.isDestroyed || this.isDestroying)) {
          this.tooltipTarget = null;
        }
      } catch (e) {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  }
}
