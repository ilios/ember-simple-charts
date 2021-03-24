import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | simple chart cluster', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    this.set('chartData', ChartData);
    const svg = 'svg';
    await render(hbs`<SimpleChartCluster
      @data={{this.chartData.cluster}}
      @isIcon={{false}}
      @isClickable={{false}}
      @hover={{noop}}
      @onClick={{noop}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    later(() => {
      percySnapshot(assert);
      assert.dom(svg).hasAttribute('height', '100%');
      assert.dom(svg).hasAttribute('width', '100%');
    }, 1000);

    await settled();
  });

  test('click event fires', async function (assert) {
    assert.expect(1);
    this.set('chartData', ChartData);
    this.set('onClick', () => {
      assert.ok(true, 'event fired.');
    });
    await render(hbs`<SimpleChartCluster
      @data={{this.chartData.cluster}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{noop}}
      @onClick={{this.onClick}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await click('svg');
  });
});
