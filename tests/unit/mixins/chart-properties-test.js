import Ember from 'ember';
import ChartPropertiesMixin from 'ember-simple-charts/mixins/chart-properties';
import { module, test } from 'qunit';

module('Unit | Mixin | chart properties');

// Replace this with your real tests.
test('it works', function(assert) {
  let ChartPropertiesObject = Ember.Object.extend(ChartPropertiesMixin);
  let subject = ChartPropertiesObject.create();
  assert.ok(subject);
});
