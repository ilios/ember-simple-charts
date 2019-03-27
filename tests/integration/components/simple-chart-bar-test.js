import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | simple chart bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('chartData', ChartData);
    const svg = 'svg';
    const shapes = `${svg} .bars rect`;
    const rect1 = `${shapes}:nth-of-type(1)`;
    const rect2 = `${shapes}:nth-of-type(2)`;
    const rect3 = `${shapes}:nth-of-type(3)`;
    const rect4 = `${shapes}:nth-of-type(4)`;

    const text = `${svg} .bars text`;
    const text1 = `${text}:nth-of-type(1)`;
    const text2 = `${text}:nth-of-type(2)`;
    const text3 = `${text}:nth-of-type(3)`;
    const text4 = `${text}:nth-of-type(4)`;

    await render(hbs`{{simple-chart-bar data=chartData.bar}}`);
    percySnapshot(assert);

    assert.equal(find(svg).getAttribute('height'), '100%');
    assert.equal(find(svg).getAttribute('width'), '100%');
    assert.equal(findAll(shapes).length, 4);
    assert.equal(find(rect1).getAttribute('y'), '43%');
    assert.equal(find(rect2).getAttribute('y'), '62%');
    assert.equal(find(rect3).getAttribute('y'), '24%');
    assert.equal(find(rect4).getAttribute('y'), '5%');
    assert.equal(find(rect1).getAttribute('fill'), 'rgb(24, 114, 244)');
    assert.equal(find(rect2).getAttribute('fill'), 'rgb(24, 244, 114)');
    assert.equal(find(rect3).getAttribute('fill'), 'rgb(167, 3, 213)');
    assert.equal(find(rect4).getAttribute('fill'), 'rgb(255, 64, 64)');

    assert.equal(findAll(text).length, 4);
    assert.equal(find(text1).textContent, '300');
    assert.equal(find(text2).textContent, '200');
    assert.equal(find(text3).textContent, '400');
    assert.equal(find(text4).textContent, '500');
    assert.ok(find(text1).getAttribute('style').includes('color: rgb(255, 255, 255);'));
    assert.ok(find(text2).getAttribute('style').includes('color: rgb(0, 0, 0);'));
    assert.ok(find(text3).getAttribute('style').includes('color: rgb(255, 255, 255);'));
    assert.ok(find(text4).getAttribute('style').includes('color: rgb(255, 255, 255);'));
  });
});
