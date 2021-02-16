import Component from '@glimmer/component';
import { timeout, task, taskGroup } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const DEBOUNCE_MS = 100;
export default class SimpleChart extends Component {
  @tracked height;
  @tracked width;
  @tracked tooltipTarget;
  get chartName() {
    return `simple-chart-${this.args.name}`;
  }

  get isClickable() {
    return !!this.args.click;
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
    if (this.args.click) {
      try {
        yield this.args.click(data);
        if (!(this.isDestroyed || this.isDestroying)) {
          this.tooltipTarget = null;
        }
      } catch (e) {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  }
}
