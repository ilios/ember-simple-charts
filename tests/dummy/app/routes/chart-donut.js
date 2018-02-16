import Route from '@ember/routing/route';
import ChartData from 'dummy/lib/chart-data';

export default Route.extend({
  model() {
    return ChartData.get('donut');
  }
});
