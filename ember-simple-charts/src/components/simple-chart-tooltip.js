import Component from '@glimmer/component';
import { action } from '@ember/object';
import { createPopper } from '@popperjs/core';

import './simple-chart-tooltip.css';

export default class SimpleChartTooltip extends Component {
  _popper = null;

  @action
  setup(element) {
    this._popper = createPopper(this.args.target, element, {
      placement: 'top',
    });
  }

  get applicationElement() {
    return document.querySelector('.ember-application');
  }

  willDestroy() {
    super.willDestroy(...arguments);
    if (this._popper) {
      this._popper.destroy();
    }
  }
}
