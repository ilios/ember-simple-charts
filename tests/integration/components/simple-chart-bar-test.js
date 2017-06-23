import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-chart-bar', 'Integration | Component | simple chart bar', {
  integration: true
});

test('it renders', function(assert) {
 this.render(hbs`{{simple-chart-bar}}`);

  assert.equal(this.$().text().trim(), '');
});
