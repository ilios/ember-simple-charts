import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { capitalize, camelize } from '@ember/string';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service chartData;
  @tracked tooltipData;
  chartTypes = ['bar', 'cluster', 'donut', 'horz-bar', 'pack', 'pie', 'tree'];
  get charts() {
    return this.chartTypes.map((name) => {
      const nm = camelize(name);
      return {
        name,
        title: capitalize(name),
        data: nm,
        clickHandler: this[`${nm}Click`],
      };
    });
  }
  barClick(data) {
    alert(`Clicked "${data}"`);
  }
  clusterClick({ name, children }) {
    alert(`Clicked "${name}: ${children.length}"`);
  }
  donutClick({ label, data }) {
    alert(`Clicked "${label}: ${data}"`);
  }
  horzBarClick(data) {
    alert(`Clicked "${data}"`);
  }
  packClick({ label, children }) {
    alert(`Clicked "${label}: ${children.length}"`);
  }
  pieClick({ label, data }) {
    alert(`Clicked "${label}: ${data}"`);
  }
  treeClick({ label, children }) {
    alert(`Clicked "${label}: ${children.length}"`);
  }
  @action
  setToolTipData(data) {
    this.tooltipData = data;
  }
}
