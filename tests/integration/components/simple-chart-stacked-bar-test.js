import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-chart-stacked-bar', 'Integration | Component | simple chart stacked-bar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{simple-chart-stacked-bar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#simple-chart-stacked-bar}}
      template block text
    {{/simple-chart-stacked-bar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
