import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | simple chart horz bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('chartData', ChartData);
    const svg = 'svg';
    const shapes = `${svg} .bars rect`;
    const rect1 = `${shapes}:nth-of-type(1)`;
    const rect2 = `${shapes}:nth-of-type(2)`;
    const rect3 = `${shapes}:nth-of-type(3)`;
    const rect4 = `${shapes}:nth-of-type(4)`;
    const rect5 = `${shapes}:nth-of-type(5)`;
    const rect6 = `${shapes}:nth-of-type(6)`;
    const rect7 = `${shapes}:nth-of-type(7)`;

    await render(hbs`{{simple-chart-horz-bar data=chartData.horz}}`);
    percySnapshot(assert);

    assert.equal(find(svg).getAttribute('height'), '100%');
    assert.equal(find(svg).getAttribute('width'), '100%');
    assert.equal(findAll(shapes).length, 7);
    assert.equal(find(rect1).getAttribute('width'), '40.714285714285715%');
    assert.equal(find(rect2).getAttribute('width'), '54.285714285714285%');
    assert.equal(find(rect3).getAttribute('width'), '81.42857142857143%');
    assert.equal(find(rect4).getAttribute('width'), '95%');
    assert.equal(find(rect5).getAttribute('width'), '27.142857142857142%');
    assert.equal(find(rect6).getAttribute('width'), '54.285714285714285%');
    assert.equal(find(rect7).getAttribute('width'), '95%');

  });
});
