import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | simple chart bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('chartData', ChartData);
    const svg = 'svg';
    const shapes = `${svg} .bars rect`;
    const rect1 = `${shapes}:eq(0)`;
    const rect2 = `${shapes}:eq(1)`;
    const rect3 = `${shapes}:eq(2)`;
    const rect4 = `${shapes}:eq(3)`;

    await render(hbs`{{simple-chart-bar data=chartData.bar}}`);
    percySnapshot(assert);

    assert.equal(find(svg).getAttribute('height'), '100%');
    assert.equal(find(svg).getAttribute('width'), '100%');
    assert.equal(this.$(shapes).length, 4);
    assert.equal(this.$(rect1).attr('y'), '43%');
    assert.equal(this.$(rect2).attr('y'), '62%');
    assert.equal(this.$(rect3).attr('y'), '24%');
    assert.equal(this.$(rect4).attr('y'), '5%');
  });
});
