import EmberObject from '@ember/object';
import ChartPropertiesMixin from 'ember-simple-charts/mixins/chart-properties';
import { module, test } from 'qunit';

module('Unit | Mixin | chart properties', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let ChartPropertiesObject = EmberObject.extend(ChartPropertiesMixin);
    let subject = ChartPropertiesObject.create();
    assert.ok(subject);
  });
});
