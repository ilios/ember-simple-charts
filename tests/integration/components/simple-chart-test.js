import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-chart', 'Integration | Component | simple chart', {
  integration: true
});

test('it renders', function(assert) {
 this.render(hbs`{{simple-chart}}`);

  assert.equal(this.$().text().trim(), '');
});
