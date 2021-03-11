import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { capitalize, camelize } from '@ember/string';

export default class ApplicationController extends Controller {
  @service chartData;
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
}
