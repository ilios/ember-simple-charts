import Component from '@glimmer/component';
import { action } from '@ember/object';
import { createPopper } from '@popperjs/core';
import './simple-chart-tooltip.css';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#in-element this.applicationElement insertBefore=null}}\n  <div class=\"simple-chart-tooltip\" {{did-insert this.setup}}>\n    <div class=\"content\">\n      {{#if @title}}\n        <div class=\"title\">\n          {{@title}}\n        </div>\n      {{/if}}\n      <div class=\"body\">\n        {{yield}}\n      </div>\n    </div>\n  </div>\n{{/in-element}}\n");

class SimpleChartTooltip extends Component {
  _popper = null;
  setup(element) {
    this._popper = createPopper(this.args.target, element, {
      placement: 'top'
    });
  }
  static {
    n(this.prototype, "setup", [action]);
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
setComponentTemplate(TEMPLATE, SimpleChartTooltip);

export { SimpleChartTooltip as default };
//# sourceMappingURL=simple-chart-tooltip.js.map
