import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-chart-pie', 'Integration | Component | simple chart pie', {
  integration: true
});

test('it renders', function(assert) {
 this.render(hbs`{{simple-chart-pie}}`);

  assert.equal(this.$().text().trim(), '');
});
