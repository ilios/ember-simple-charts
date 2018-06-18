import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | simple chart tree', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('chartData', ChartData);
    const svg = 'svg';
    await render(hbs`{{simple-chart-tree data=chartData.tree}}`);
    later(() => {
      percySnapshot(assert);
      assert.equal(find(svg).getAttribute('height'), '100%');
      assert.equal(find(svg).getAttribute('width'), '100%');
    }, 1000);

    await settled();
  });
});
