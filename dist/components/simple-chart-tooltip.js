import "./simple-chart-tooltip.css"
import Component from '@glimmer/component';
import { createPopper } from '@popperjs/core';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

;

class SimpleChartTooltip extends Component {
  _popper = null;
  setup = modifier(element => {
    this._popper = createPopper(this.args.target, element, {
      placement: 'top'
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
  static {
    setComponentTemplate(precompileTemplate("{{#in-element this.applicationElement insertBefore=null}}\n  <div class=\"simple-chart-tooltip\" {{this.setup}}>\n    <div class=\"content\">\n      {{#if @title}}\n        <div class=\"title\">\n          {{@title}}\n        </div>\n      {{/if}}\n      <div class=\"body\">\n        {{yield}}\n      </div>\n    </div>\n  </div>\n{{/in-element}}", {
      strictMode: true
    }), this);
  }
}

export { SimpleChartTooltip as default };
//# sourceMappingURL=simple-chart-tooltip.js.map
