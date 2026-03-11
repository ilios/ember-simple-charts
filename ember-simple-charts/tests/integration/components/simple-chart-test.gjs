import { click, render } from '@ember/test-helpers';
import { module, test, todo } from 'qunit';
import SimpleChart from '#src/components/simple-chart';
import { setupRenderingTest } from 'ember-qunit';
import chartsLoaded from '../../helpers/charts-loaded.js';
import ChartData from '../../helpers/chart-data.js';

module('Integration | Component | SimpleChart', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><SimpleChart @name="donut" /></template>);

    await chartsLoaded();
    assert.dom('*').includesText('');
  });

  test('click event fires', async function (assert) {
    assert.expect(1);
    this.set('chartData', ChartData);
    this.set('onClick', () => {
      assert.ok(true, 'event fired.');
    });
    await render(
      <template>
        <SimpleChart
          @name="donut"
          @data={{this.data}}
          @isClickable={{true}}
          @onClick={{this.onClick}}
        />
      </template>,
    );
    await chartsLoaded();
    await click('svg .chart .slice:nth-of-type(1) .slicepath');
  });

  // works in the browser, but not in CI probably because of an
  // issue with the isDevelopingApp embroider macro
  todo('click waits for promise', async function (assert) {
    assert.expect(1);
    assert.timeout(2000);
    this.set('chartData', ChartData);
    this.set('onClick', async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 1000),
      );
      assert.ok(true, 'event fired.');
      return true;
    });
    await render(
      <template>
        <SimpleChart
          @name="donut"
          @data={{this.data}}
          @isClickable={{true}}
          @onClick={{this.onClick}}
        />
      </template>,
    );
    await chartsLoaded();
    const start = Date.now();
    await click('svg .chart .slice:nth-of-type(1) .slicepath');
    const end = Date.now();
    const time = end - start;
    assert.closeTo(time, 1100, 100);
  });
});
