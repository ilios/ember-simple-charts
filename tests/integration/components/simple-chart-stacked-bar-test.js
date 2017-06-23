import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-chart-stacked-bar', 'Integration | Component | simple chart stacked-bar', {
  integration: true
});

test('it renders', function(assert) {
 this.render(hbs`{{simple-chart-stacked-bar}}`);

  assert.equal(this.$().text().trim(), '');
});
