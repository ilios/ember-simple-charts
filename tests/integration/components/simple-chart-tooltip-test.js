import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import ChartData from 'dummy/lib/chart-data';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple chart tooltip', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <div id="target"></div>
      {{#if this.show}}
        <SimpleChartTooltip @target={{this.target}} @title="the title">
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

  test('click event fires', async function (assert) {
    assert.expect(1);
    this.set('chartData', ChartData);
    this.set('onClick', () => {
      assert.ok(true, 'event fired.');
    });
    this.set('target', document.getElementById('target'));
    this.set('show', true);
    await render(hbs`
      <div id="target"></div>
      {{#if this.show}}
        <SimpleChartTooltip @target={{this.target}} @title="" @isClickable={{true}} @onClick={{this.onClick}}/>
      {{/if}}
    `);
    await click('.simple-chart-tooltip');
  });
});
