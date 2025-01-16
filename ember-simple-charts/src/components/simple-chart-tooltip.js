import Component from '@glimmer/component';
import { createPopper } from '@popperjs/core';
import { modifier } from 'ember-modifier';
import './simple-chart-tooltip.css';

export default class SimpleChartTooltip extends Component {
  _popper = null;

  setup = modifier((element) => {
    this._popper = createPopper(this.args.target, element, {
      placement: 'top',
    });

    return () => {
      if (this._popper) {
        this._popper.destroy();
      }
    };
  });

  get applicationElement() {
    return document.querySelector('.ember-application');
  }
}
