import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import ChartData from 'dummy/lib/chart-data';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple chart', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<SimpleChart @name="donut" />`);

    assert.dom('*').hasText('');
  });

  test('click event fires', async function (assert) {
    assert.expect(1);
    this.set('chartData', ChartData);
    this.set('onClick', () => {
      assert.ok(true, 'event fired.');
    });
    await render(
      hbs`<SimpleChart @name="donut" @data={{this.chartData.donut}} @isClickable={{true}} @onClick={{this.onClick}}/>`
    );
    await click('svg');
  });
});
