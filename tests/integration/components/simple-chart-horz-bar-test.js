import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-chart-horz-bar', 'Integration | Component | simple chart horz-bar', {
  integration: true
});

test('it renders', function(assert) {
 this.render(hbs`{{simple-chart-horz-bar}}`);

  assert.equal(this.$().text().trim(), '');
});
