import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find, findAll, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | simple chart pie', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('chartData', ChartData);
    const svg = 'svg';
    const loaded = '.loaded';
    await render(hbs`{{simple-chart-pie data=chartData.pie}}`);



    //let the chart animations finish
    await waitUntil(() => {
      return findAll(loaded).length;
    });

    percySnapshot(assert);

    assert.equal(find(svg).getAttribute('height'), '100%');
    assert.equal(find(svg).getAttribute('width'), '100%');

    await settled();
  });
});
