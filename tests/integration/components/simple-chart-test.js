import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple chart', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
   await render(hbs`{{simple-chart name='donut'}}`);

    assert.equal(find('*').textContent.trim(), '');
  });
});
