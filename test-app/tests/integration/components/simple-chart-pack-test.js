import { module, test } from 'qunit';
import { setupRenderingTest, chartsLoaded } from 'test-app/tests/helpers';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'test-app/lib/chart-data';
import percySnapshot from '@percy/ember';

module('Integration | Component | simple chart pack', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    const svg = 'svg';
    await render(hbs`<SimpleChartPack
      @data={{this.chartData.pack}}
      @isIcon={{false}}
      @isClickable={{false}}
      @hover={{(noop)}}
      @onClick={{(noop)}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await chartsLoaded();
    percySnapshot(assert);
    assert.dom(svg).hasAttribute('height', '100%');
    assert.dom(svg).hasAttribute('width', '100%');
    assert
      .dom(`${svg} g circle:nth-of-type(1) desc`)
      .hasText('this is the root.');
  });

  test('click event fires', async function (assert) {
    assert.expect(1);
    this.set('chartData', ChartData);
    this.set('onClick', () => {
      assert.ok(true, 'event fired.');
    });
    await render(hbs`<SimpleChartPack
      @data={{this.chartData.pack}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{(noop)}}
      @onClick={{this.onClick}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await click('svg .chart circle:nth-of-type(1)');
  });
});
