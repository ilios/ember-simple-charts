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
    const text = `${svg} .bars text`;
    const text1 = `${text}:nth-of-type(1)`;
    const text2 = `${text}:nth-of-type(2)`;
    const text3 = `${text}:nth-of-type(3)`;
    const text4 = `${text}:nth-of-type(4)`;
    const text5 = `${text}:nth-of-type(5)`;
    const text6 = `${text}:nth-of-type(6)`;
    const text7 = `${text}:nth-of-type(7)`;

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

    assert.equal(find(rect1).getAttribute('fill'), 'rgb(13, 233, 137)');
    assert.equal(find(rect2).getAttribute('fill'), 'rgb(13, 137, 233)');
    assert.equal(find(rect3).getAttribute('fill'), 'rgb(207, 1, 174)');
    assert.equal(find(rect4).getAttribute('fill'), 'rgb(255, 64, 64)');
    assert.equal(find(rect5).getAttribute('fill'), 'rgb(99, 249, 34)');
    assert.equal(find(rect6).getAttribute('fill'), 'rgb(13, 137, 233)');
    assert.equal(find(rect7).getAttribute('fill'), 'rgb(255, 64, 64)');
    assert.equal(find(text1).textContent, 'Mark');
    assert.equal(find(text2).textContent, 'John');
    assert.equal(find(text3).textContent, 'Kathy');
    assert.equal(find(text4).textContent, 'Jeff Long Namerson');
    assert.equal(find(text5).textContent, 'Joe');
    assert.equal(find(text6).textContent, 'Kelly');
    assert.equal(find(text7).textContent, 'Jason');
    assert.ok(find(text1).getAttribute('style').includes('color: rgb(0, 0, 0)'));
    assert.ok(find(text2).getAttribute('style').includes('color: rgb(255, 255, 255)'));
    assert.ok(find(text3).getAttribute('style').includes('color: rgb(255, 255, 255)'));
    assert.ok(find(text4).getAttribute('style').includes('color: rgb(255, 255, 255)'));
    assert.ok(find(text5).getAttribute('style').includes('color: rgb(0, 0, 0)'));
    assert.ok(find(text6).getAttribute('style').includes('color: rgb(255, 255, 255)'));
    assert.ok(find(text7).getAttribute('style').includes('color: rgb(255, 255, 255)'));

  });
});
