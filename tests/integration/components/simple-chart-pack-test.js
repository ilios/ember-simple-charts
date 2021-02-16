import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | simple chart pack', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    this.set('chartData', ChartData);
    const svg = 'svg';
    await render(hbs`<SimpleChartPack
      @data={{this.chartData.pack}}
      @isIcon={{false}}
      @isClickable={{false}}
      @hover={{noop}}
      @click={{noop}}
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
});
