import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'test-app/lib/chart-data';
import percySnapshot from '@percy/ember';

module('Integration | Component | simple chart horz bar', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(32);
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

    await render(hbs`<SimpleChartHorzBar
      @data={{this.chartData.horzBar}}
      @isIcon={{false}}
      @isClickable={{false}}
      @hover={{(noop)}}
      @onClick={{(noop)}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    percySnapshot(assert);

    assert.dom(svg).hasAttribute('height', '100%');
    assert.dom(svg).hasAttribute('width', '100%');
    assert.dom(shapes).exists({ count: 7 });
    assert.dom(rect1).hasAttribute('width', '40.714285714285715%');
    assert.dom(rect2).hasAttribute('width', '54.285714285714285%');
    assert.dom(rect3).hasAttribute('width', '81.42857142857143%');
    assert.dom(rect4).hasAttribute('width', '95%');
    assert.dom(rect5).hasAttribute('width', '27.142857142857142%');
    assert.dom(rect6).hasAttribute('width', '54.285714285714285%');
    assert.dom(rect7).hasAttribute('width', '95%');

    assert.dom(rect1).hasAttribute('fill', 'rgb(13, 233, 137)');
    assert.dom(rect2).hasAttribute('fill', 'rgb(13, 137, 233)');
    assert.dom(rect3).hasAttribute('fill', 'rgb(207, 1, 174)');
    assert.dom(rect4).hasAttribute('fill', 'rgb(255, 64, 64)');
    assert.dom(rect5).hasAttribute('fill', 'rgb(99, 249, 34)');
    assert.dom(rect6).hasAttribute('fill', 'rgb(13, 137, 233)');
    assert.dom(rect7).hasAttribute('fill', 'rgb(255, 64, 64)');
    assert.dom(text1).hasText('Mark');
    assert.dom(text2).hasText('John');
    assert.dom(text3).hasText('Kathy');
    assert.dom(text4).hasText('Jeff Long Namerson');
    assert.dom(text5).hasText('Joe');
    assert.dom(text6).hasText('Kelly');
    assert.dom(text7).hasText('Jason');
    assert.ok(
      find(text1).getAttribute('style').includes('color: rgb(0, 0, 0)'),
    );
    assert.ok(
      find(text2).getAttribute('style').includes('color: rgb(255, 255, 255)'),
    );
    assert.ok(
      find(text3).getAttribute('style').includes('color: rgb(255, 255, 255)'),
    );
    assert.ok(
      find(text4).getAttribute('style').includes('color: rgb(255, 255, 255)'),
    );
    assert.ok(
      find(text5).getAttribute('style').includes('color: rgb(0, 0, 0)'),
    );
    assert.ok(
      find(text6).getAttribute('style').includes('color: rgb(255, 255, 255)'),
    );
    assert.ok(
      find(text7).getAttribute('style').includes('color: rgb(255, 255, 255)'),
    );
    assert
      .dom(`${rect1} desc`)
      .hasText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  });

  test('click event fires', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    this.set('onClick', (obj) => {
      assert.strictEqual(obj.label, 'Mark');
      assert.strictEqual(obj.data, 150);
      assert.strictEqual(obj.meta.id, 10);
    });
    await render(hbs`<SimpleChartHorzBar
      @data={{this.chartData.horzBar}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{(noop)}}
      @onClick={{this.onClick}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await click('svg .bars rect:nth-of-type(1)');
  });

  test('hover event fires', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    this.set('onHover', (obj) => {
      assert.strictEqual(obj.label, 'Mark');
      assert.strictEqual(obj.data, 150);
      assert.strictEqual(obj.meta.id, 10);
    });
    await render(hbs`<SimpleChartHorzBar
      @data={{this.chartData.horzBar}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{this.onHover}}
      @onClick={{(noop)}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await triggerEvent('svg .bars rect:nth-of-type(1)', 'mouseenter');
  });
});
