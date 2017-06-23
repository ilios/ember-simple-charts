import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-chart-legend', 'Integration | Component | simple chart legend', {
  integration: true
});

test('it renders', function(assert) {
 this.render(hbs`{{simple-chart-legend}}`);

  assert.equal(this.$().text().trim(), '');
});
