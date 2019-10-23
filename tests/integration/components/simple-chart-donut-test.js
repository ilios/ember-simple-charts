import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  settled,
  findAll,
  waitUntil
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | simple chart donut', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('chartData', ChartData);
    const svg = 'svg';
    const loaded = '.loaded';
    await render(hbs`<SimpleChartDonut
      @data={{chartData.donut}}
      @isIcon={{false}}
      @isClickable={{false}}
      @hover={{fn this.nothing}}
      @click={{fn this.nothing}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);

    //let the chart animations finish
    await waitUntil(() => {
      return findAll(loaded).length;
    });

    percySnapshot(assert);
    assert.dom(svg).hasAttribute('height', '100%');
    assert.dom(svg).hasAttribute('width', '100%');

    await settled();
  });
});
