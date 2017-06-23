import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-chart-tooltip', 'Integration | Component | simple chart tooltip', {
  integration: true
});

test('it renders', function(assert) {
 this.render(hbs`{{simple-chart-tooltip}}`);

  assert.equal(this.$().text().trim(), '');
});
