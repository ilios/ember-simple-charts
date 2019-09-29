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

module('Integration | Component | simple chart pie', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('chartData', ChartData);
    const svg = 'svg';
    const loaded = '.loaded';
    await render(hbs`<SimpleChartPie @data={{chartData.pie}} />`);


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
