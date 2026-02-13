import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import SimpleChartTooltip from '#src/components/simple-chart-tooltip';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | SimpleChartTooltip', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <div id="target"></div>
        {{#if this.show}}
          <SimpleChartTooltip @target={{this.target}} @title="the title">
            template block text
          </SimpleChartTooltip>
        {{/if}}
      </template>,
    );
    this.set('target', document.getElementById('target'));
    // Now with a target in the dom we can show the tooltip
    this.set('show', true);

    assert.dom('.title').hasText('the title');
    assert.dom('.body').hasText('template block text');
  });
});
