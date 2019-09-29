import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple chart tooltip', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <div id="target"></div>
      {{#if show}}
        <SimpleChartTooltip @target={{target}} @title="the title">
          template block text
        </SimpleChartTooltip>
      {{/if}}
    `);
    this.set('target', document.getElementById('target'));
    // Now with a target in the dom we can show the tooltip
    this.set('show', true);

    assert.dom('.title').hasText('the title');
    assert.dom('.body').hasText('template block text');
  });
});
