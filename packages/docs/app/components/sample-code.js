import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import handlebars from 'highlight.js/lib/languages/handlebars';
import javascript from 'highlight.js/lib/languages/javascript';
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

  @action
  highlight(el) {
    hljs.highlightBlock(el);
  }
}
