import Service from '@ember/service';
import ChartData from '../lib/chart-data';

export default class ChartDataService extends Service {
  constructor() {
    super(...arguments);
    for (let [key, value] of Object.entries(ChartData)) {
      this[key] = value;
    }
  }
}
