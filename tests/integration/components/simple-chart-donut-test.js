import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-chart-donut', 'Integration | Component | simple chart donut', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{simple-chart-donut}}`);

  assert.equal(this.$().text().trim(), '');
});
