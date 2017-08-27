import Ember from 'ember';
import ChartData from 'dummy/lib/chart-data';

export default Ember.Route.extend({
  model() {
    return ChartData.get('horz');
  }
});
