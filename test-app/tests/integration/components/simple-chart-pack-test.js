import { module, test } from 'qunit';
import { setupRenderingTest, chartsLoaded } from 'test-app/tests/helpers';
import { click, render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'test-app/lib/chart-data';
import percySnapshot from '@percy/ember';

module('Integration | Component | simple chart pack', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(69);
    this.set('chartData', ChartData);
    const svg = 'svg';
    const chart = `${svg} .chart`;
    const circles = `${chart} circle`;
    const circle1 = `${circles}:nth-of-type(1)`;
    const text1 = `${circle1} desc`;
    const circle2 = `${circles}:nth-of-type(2)`;
    const text2 = `${circle2} desc`;
    const circle3 = `${circles}:nth-of-type(3)`;
    const text3 = `${circle3} desc`;
    const circle4 = `${circles}:nth-of-type(4)`;
    const text4 = `${circle4} desc`;
    const circle5 = `${circles}:nth-of-type(5)`;
    const text5 = `${circle5} desc`;
    const circle6 = `${circles}:nth-of-type(6)`;
    const text6 = `${circle6} desc`;
    const circle7 = `${circles}:nth-of-type(7)`;
    const text7 = `${circle7} desc`;
    const circle8 = `${circles}:nth-of-type(8)`;
    const text8 = `${circle8} desc`;
    const circle9 = `${circles}:nth-of-type(9)`;
    const text9 = `${circle9} desc`;
    const circle10 = `${circles}:nth-of-type(10)`;
    const text10 = `${circle10} desc`;
    const circle11 = `${circles}:nth-of-type(11)`;
    const text11 = `${circle11} desc`;
    const circle12 = `${circles}:nth-of-type(12)`;
    const text12 = `${circle12} desc`;
    const circle13 = `${circles}:nth-of-type(13)`;
    const text13 = `${circle13} desc`;

    await render(hbs`<SimpleChartPack
      @data={{this.chartData.pack}}
      @isIcon={{false}}
      @isClickable={{false}}
      @hover={{(noop)}}
      @onClick={{(noop)}}
      @containerHeight={{200}}
      @containerWidth={{200}}
    />`);
    await chartsLoaded();
    percySnapshot(assert);
    assert.dom(svg).hasAttribute('height', '200');
    assert.dom(svg).hasAttribute('width', '200');
    assert.dom(chart).exists();
    assert.dom(circles).exists({ count: 13 });
    assert.dom(circle1).hasAttribute('fill', 'rgb(255, 64, 64)');
    assert.dom(circle1).hasAttribute('cx', '92.5');
    assert.dom(circle1).hasAttribute('cy', '92.5');
    assert.dom(circle1).hasAttribute('r', '92.5');
    assert.dom(text1).hasText('this is the root.');

    assert.dom(circle2).hasAttribute('fill', 'rgb(250, 98, 35)');
    assert.dom(circle2).hasAttribute('cx', '72.37704253018065');
    assert.dom(circle2).hasAttribute('cy', '93.11188083133277');
    assert.dom(circle2).hasAttribute('r', '21.093433896397805');
    assert.dom(text2).hasText('this is the first one.');

    assert.dom(circle3).hasAttribute('fill', 'rgb(125, 239, 18)');
    assert.dom(circle3).hasAttribute('cx', '127.94060084716614');
    assert.dom(circle3).hasAttribute('cy', '93.11188083133277');
    assert.dom(circle3).hasAttribute('r', '27.95584324871791');
    assert.dom(text3).hasText('this is the second one.');

    assert.dom(circle4).hasAttribute('fill', 'rgb(9, 145, 228)');
    assert.dom(circle4).hasAttribute('cx', '92.53600467342365');
    assert.dom(circle4).hasAttribute('cy', '147.8041995184308');
    assert.dom(circle4).hasAttribute('r', '30.681507589645758');
    assert.dom(text4).hasText('this is the third one.');

    assert.dom(circle5).hasAttribute('fill', 'rgb(209, 171, 2)');
    assert.dom(circle5).hasAttribute('cx', '92.4643729159033');
    assert.dom(circle5).hasAttribute('cy', '37.77578839667657');
    assert.dom(circle5).hasAttribute('r', '31.261495627664047');
    assert.dom(text5).hasText('this is the fourth one.');

    assert.dom(circle6).hasAttribute('fill', 'rgb(252, 88, 42)');
    assert.dom(circle6).hasAttribute('cx', '66.79060743118444');
    assert.dom(circle6).hasAttribute('cy', '88.804281329301');
    assert.dom(circle6).hasAttribute('r', '7.5248157191673455');
    assert.dom(text6).hasText('this is the first two one.');

    assert.dom(circle7).hasAttribute('fill', 'rgb(255, 67, 61)');
    assert.dom(circle7).hasAttribute('cx', '83.49012843332274');
    assert.dom(circle7).hasAttribute('cy', '88.804281329301');
    assert.dom(circle7).hasAttribute('r', '2.6604241111011793');
    assert.dom(text7).hasText('this is the first two two.');

    assert.dom(circle8).hasAttribute('fill', 'rgb(255, 70, 58)');
    assert.dom(circle8).hasAttribute('cx', '79.61728301574517');
    assert.dom(circle8).hasAttribute('cy', '101.14810427176126');
    assert.dom(circle8).hasAttribute('r', '3.762407859583673');
    assert.dom(text8).hasText('this is the first two three.');

    assert.dom(circle9).hasAttribute('fill', 'rgb(125, 239, 18)');
    assert.dom(circle9).hasAttribute('cx', '127.94060084716614');
    assert.dom(circle9).hasAttribute('cy', '93.11188083133277');
    assert.dom(circle9).hasAttribute('r', '21.44156207684813');
    assert.dom(text9).hasText('this is the second two one.');

    assert.dom(circle10).hasAttribute('fill', 'rgb(237, 128, 17)');
    assert.dom(circle10).hasAttribute('cx', '79.61493678291241');
    assert.dom(circle10).hasAttribute('cy', '37.77578839667657');
    assert.dom(circle10).hasAttribute('r', '11.897778322803378');
    assert.dom(text10).hasText('this is the fourth two one.');

    assert.dom(circle11).hasAttribute('fill', 'rgb(248, 105, 30)');
    assert.dom(circle11).hasAttribute('cx', '107.61929182464156');
    assert.dom(circle11).hasAttribute('cy', '37.77578839667657');
    assert.dom(circle11).hasAttribute('r', '9.592295547056004');
    assert.dom(text11).hasText('this is the fourth two two.');

    assert.dom(circle12).hasAttribute('fill', 'rgb(217, 162, 4)');
    assert.dom(circle12).hasAttribute('cx', '127.94060084716614');
    assert.dom(circle12).hasAttribute('cy', '93.11188083133277');
    assert.dom(circle12).hasAttribute('r', '14.927280904978353');
    assert.dom(text12).hasText('this is the second three one.');

    assert.dom(circle13).hasAttribute('fill', 'rgb(251, 95, 37)');
    assert.dom(circle13).hasAttribute('cx', '127.94060084716614');
    assert.dom(circle13).hasAttribute('cy', '93.11188083133277');
    assert.dom(circle13).hasAttribute('r', '8.412999733108576');
    assert.dom(text13).hasText('this is the second four one.');
  });

  test('click event fires', async function (assert) {
    assert.expect(1);
    this.set('chartData', ChartData);
    this.set('onClick', () => {
      assert.ok(true, 'event fired.');
    });
    await render(hbs`<SimpleChartPack
      @data={{this.chartData.pack}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{(noop)}}
      @onClick={{this.onClick}}
      @containerHeight={{200}}
      @containerWidth={{200}}
    />`);
    await click('svg .chart circle:nth-of-type(1)');
  });

  test('hover event fires', async function (assert) {
    assert.expect(1);
    this.set('chartData', ChartData);
    this.set('onHover', (obj) => {
      assert.strictEqual(obj.label, 'Root');
    });
    await render(hbs`<SimpleChartPack
      @data={{this.chartData.pack}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{this.onHover}}
      @onClick={{(noop)}}
      @containerHeight={{200}}
      @containerWidth={{200}}
    />`);
    await triggerEvent('svg .chart circle:nth-of-type(1)', 'mouseenter');
  });

  test('it responds to changing data', async function (assert) {
    assert.expect(28);
    this.set('data', {
      label: 'Root',
      value: 100,
      children: [
        {
          label: 'child',
          value: 50,
          children: [],
        },
      ],
    });
    this.set('isIcon', false);
    this.set('hover', () => {});
    this.set('onClick', () => {});
    this.set('containerHeight', 200);
    this.set('containerWidth', 200);
    await render(hbs`<SimpleChartPack
      @data={{this.data}}
      @isIcon={{this.isIcon}}
      @isClickable={{true}}
      @hover={{this.hover}}
      @onClick={{this.onClick}}
      @containerHeight={{this.containerHeight}}
      @containerWidth={{this.containerWidth}}
    />`);

    const check = async (height, width, fills) => {
      await chartsLoaded();
      const svg = 'svg';
      const circles = `${svg} .chart circle`;
      assert.dom(svg).hasAttribute('height', height);
      assert.dom(svg).hasAttribute('width', width);
      assert.dom(circles).exists({ count: fills.length });
      for (let i = 0; i < fills.length; i++) {
        assert
          .dom(`${circles}:nth-of-type(${i + 1})`)
          .hasAttribute('fill', fills[i]);
      }
      await click(`${circles}:nth-of-type(1)`);
      await triggerEvent(`${circles}:nth-of-type(1)`, 'mouseenter');
    };
    await check('200', '200', ['rgb(255, 64, 64)', 'rgb(64, 255, 64)']);

    this.set('data', {
      label: 'Root',
      value: 33,
      children: [],
    });
    await check('200', '200', ['rgb(255, 64, 64)']);

    this.set('containerHeight', 100);
    await check('100', '200', ['rgb(255, 64, 64)']);
    this.set('containerWidth', 100);
    await check('100', '100', ['rgb(255, 64, 64)']);
    this.set('onClick', () => {
      assert.ok(true);
    });
    await check('100', '100', ['rgb(255, 64, 64)']);
    this.set('hover', () => {
      assert.ok(true);
    });
    await check('100', '100', ['rgb(255, 64, 64)']);

    this.set('isIcon', true);
    this.set('onClick', () => {
      assert.false(true, 'onClick should not be called');
    });
    this.set('hover', () => {
      assert.false(true, 'hover should not be called');
    });
  });
});
