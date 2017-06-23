import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-chart-line', 'Integration | Component | simple chart line', {
  integration: true
});

test('it renders', function(assert) {
 this.render(hbs`{{simple-chart-line}}`);

  assert.equal(this.$().text().trim(), '');
});
