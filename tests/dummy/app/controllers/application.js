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
      return {
        name,
        title: capitalize(name),
        data: camelize(name),
      };
    });
  }
  click({ label, data }) {
    alert(`Clicked "${label}: ${data}"`);
  }
  @action
  setToolTipData(data) {
    this.tooltipData = data;
  }
}
