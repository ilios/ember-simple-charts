import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import handlebars from 'highlight.js/lib/languages/handlebars';
import javascript from 'highlight.js/lib/languages/javascript';
import { modifier } from 'ember-modifier';
import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('handlebars', handlebars);

export default class SampleCodeComponent extends Component {
  @tracked showHTML = true;
  @tracked showCSS = false;
  @tracked showData = false;

  @action
  displayHTML() {
    this.showHTML = true;
    this.showCSS = false;
    this.showData = false;
  }

  @action
  displayCSS() {
    this.showHTML = false;
    this.showCSS = true;
    this.showData = false;
  }

  @action
  displayData() {
    this.showHTML = false;
    this.showCSS = false;
    this.showData = true;
  }

  highlight = modifier((el) => {
    hljs.highlightElement(el);
  });
  <template>
    <div class="sample-code">
      <nav
        id={{concat @exampleType "-example-menu"}}
        aria-label={{concat @exampleType "-example-menu"}}
      >
        <button
          type="button"
          disabled={{this.showHTML}}
          {{on "click" this.displayHTML}}
        >
          HTML
        </button>
        <button
          type="button"
          disabled={{this.showCSS}}
          {{on "click" this.displayCSS}}
        >
          CSS
        </button>
        <button
          type="button"
          disabled={{this.showData}}
          {{on "click" this.displayData}}
        >
          Data
        </button>
      </nav>
      {{#if this.showHTML}}
        <pre {{this.highlight}}>
{{yield to="html"}}
    </pre>
      {{/if}}
      {{#if this.showCSS}}
        <pre {{this.highlight}}>
{{yield to="css"}}
    </pre>
      {{/if}}
      {{#if this.showData}}
        <pre {{this.highlight}}>
        <code class="language-javascript">
            {{yield to="data"}}
          </code>
    </pre>
      {{/if}}
    </div>
  </template>
}
