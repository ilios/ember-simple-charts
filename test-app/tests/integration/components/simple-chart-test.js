import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, findAll, waitUntil } from '@ember/test-helpers';
import ChartData from 'test-app/lib/chart-data';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple chart', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<SimpleChart @name="donut" />`);

    assert.dom('*').includesText('');
  });

  test('click event fires', async function (assert) {
    assert.expect(1);
    this.set('chartData', ChartData);
    this.set('onClick', () => {
      assert.ok(true, 'event fired.');
    });
    await render(hbs`<SimpleChart
      @name="donut"
      @data={{this.data}}
      @isClickable={{true}}
      @onClick={{this.onClick}}/>
    `);
    //let the chart animations finish
    await waitUntil(() => {
      return (
        findAll('.loaded').length &&
        findAll('svg .chart .slice:nth-of-type(1) .slicepath').length
      );
    });
    await click('svg .chart .slice:nth-of-type(1) .slicepath');
  });
});
