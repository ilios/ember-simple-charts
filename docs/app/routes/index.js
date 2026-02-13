import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service chartData;

  model() {
    return this.chartData;
  }
}
