import { module, test } from 'qunit';
import { setupRenderingTest, chartsLoaded } from 'test-app/tests/helpers';
import { click, render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'test-app/lib/chart-data';
import percySnapshot from '@percy/ember';

module('Integration | Component | simple chart pie', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(36);
    this.set('chartData', ChartData);
    const svg = 'svg';
    const chart = `${svg} .chart`;
    const sections = `${chart} .slice`;
    const section1 = `${sections}:nth-of-type(1)`;
    const section2 = `${sections}:nth-of-type(2)`;
    const section3 = `${sections}:nth-of-type(3)`;
    const section4 = `${sections}:nth-of-type(4)`;
    await render(hbs`<SimpleChartPie
      @data={{this.chartData.pie}}
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
    assert.dom(sections).exists({ count: 4 });
    assert
      .dom(`${section1} path`)
      .hasAttribute('d', 'M0,-100A100,100,0,0,1,97.493,-22.252L0,0Z');
    assert.dom(`${section1} path`).hasAttribute('fill', 'rgb(24, 114, 244)');
    assert.dom(`${section1} path`).hasAttribute('stroke', '#FFFFFF');
    assert
      .dom(`${section1} text`)
      .hasAttribute(
        'transform',
        'translate(42.39730652639388,-53.16454080782603)',
      );
    assert.dom(`${section1} text`).hasAttribute('text-anchor', 'middle');
    assert
      .dom(`${section1} text`)
      .hasAttribute('style', 'fill: rgb(255, 255, 255); font-size: 0.8rem;');
    assert.dom(`${section1} text`).includesText('Totally Cool');
    assert.dom(`${section1} desc`).includesText('This is totally cool.');

    assert
      .dom(`${section2} path`)
      .hasAttribute('d', 'M97.493,-22.252A100,100,0,0,1,78.183,62.349L0,0Z');
    assert.dom(`${section2} path`).hasAttribute('fill', 'rgb(24, 244, 114)');
    assert.dom(`${section2} path`).hasAttribute('stroke', '#FFFFFF');
    assert
      .dom(`${section2} text`)
      .hasAttribute(
        'transform',
        'translate(66.29509802836401,15.131423509029378)',
      );
    assert.dom(`${section2} text`).hasAttribute('text-anchor', 'middle');
    assert
      .dom(`${section2} text`)
      .hasAttribute('style', 'fill: rgb(0, 0, 0); font-size: 0.8rem;');
    assert.dom(`${section2} text`).includesText('Way Cool');
    assert.dom(`${section2} desc`).includesText('This is way cool.');

    assert
      .dom(`${section3} path`)
      .hasAttribute('d', 'M78.183,62.349A100,100,0,0,1,-78.183,62.349L0,0Z');
    assert.dom(`${section3} path`).hasAttribute('fill', 'rgb(167, 3, 213)');
    assert.dom(`${section3} path`).hasAttribute('stroke', '#FFFFFF');
    assert
      .dom(`${section3} text`)
      .hasAttribute('transform', 'translate(4.1637991171010006e-15,68)');
    assert.dom(`${section3} text`).hasAttribute('text-anchor', 'middle');
    assert
      .dom(`${section3} text`)
      .hasAttribute('style', 'fill: rgb(255, 255, 255); font-size: 0.8rem;');
    assert.dom(`${section3} text`).includesText('Cucumber Cool');
    assert.dom(`${section3} desc`).includesText('This is cool as cucumber.');

    assert
      .dom(`${section4} path`)
      .hasAttribute('d', 'M-78.183,62.349A100,100,0,0,1,0,-100L0,0Z');
    assert.dom(`${section4} path`).hasAttribute('fill', 'rgb(255, 64, 64)');
    assert.dom(`${section4} path`).hasAttribute('stroke', '#FFFFFF');
    assert
      .dom(`${section4} text`)
      .hasAttribute(
        'transform',
        'translate(-61.2658830173645,-29.504094259993945)',
      );
    assert.dom(`${section4} text`).hasAttribute('text-anchor', 'middle');
    assert
      .dom(`${section4} text`)
      .hasAttribute('style', 'fill: rgb(255, 255, 255); font-size: 0.8rem;');
    assert.dom(`${section4} text`).includesText('So Cool');
    assert.dom(`${section4} desc`).includesText('This is so cool.');
  });

  //<svg xmlns="http://www.w3.org/2000/svg" class="simple-chart-pie loaded" height="200" width="200"><g class="chart" transform="translate(100,100)"><g class="slice"><path class="slicepath" d="M0,-100A100,100,0,0,1,97.493,-22.252L0,0Z" stroke="#FFFFFF" fill="rgb(24, 114, 244)"></path><text style="color: rgb(255, 255, 255); font-size: 0.8rem;" transform="translate(42.39730652639388,-53.16454080782603)" text-anchor="middle">Totally Cool</text><desc>This is totally cool.</desc></g><g class="slice"><path class="slicepath" d="M97.493,-22.252A100,100,0,0,1,78.183,62.349L0,0Z" stroke="#FFFFFF" fill="rgb(24, 244, 114)"></path><text style="color: rgb(0, 0, 0); font-size: 0.8rem;" transform="translate(66.29509802836401,15.131423509029378)" text-anchor="middle">Way Cool</text><desc>This is way cool.</desc></g><g class="slice"><path class="slicepath" d="M78.183,62.349A100,100,0,0,1,-78.183,62.349L0,0Z" stroke="#FFFFFF" fill="rgb(167, 3, 213)"></path><text style="color: rgb(255, 255, 255); font-size: 0.8rem;" transform="translate(4.1637991171010006e-15,68)" text-anchor="middle">Cucumber Cool</text><desc>This is cool as cucumber.</desc></g><g class="slice"><path class="slicepath" d="M-78.183,62.349A100,100,0,0,1,0,-100L0,0Z" stroke="#FFFFFF" fill="rgb(255, 64, 64)"></path><text style="color: rgb(255, 255, 255); font-size: 0.8rem;" transform="translate(-61.2658830173645,-29.504094259993945)" text-anchor="middle">So Cool</text><desc>This is so cool.</desc></g></g></svg>

  test('click event fires', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    this.set('onClick', (obj) => {
      assert.strictEqual(obj.label, 'Totally Cool');
      assert.strictEqual(obj.data, 300);
      assert.strictEqual(obj.meta.id, 10);
    });
    await render(hbs`<SimpleChartPie
      @data={{this.chartData.pie}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{(noop)}}
      @onClick={{this.onClick}}
      @containerHeight={{200}}
      @containerWidth={{200}}
    />`);
    await click('svg .chart .slice:nth-of-type(1) path');
  });

  test('hover event fires', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    this.set('onHover', (obj) => {
      assert.strictEqual(obj.label, 'Totally Cool');
      assert.strictEqual(obj.data, 300);
      assert.strictEqual(obj.meta.id, 10);
    });
    await render(hbs`<SimpleChartPie
      @data={{this.chartData.pie}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{this.onHover}}
      @onClick={{(noop)}}
      @containerHeight={{200}}
      @containerWidth={{200}}
    />`);
    await triggerEvent('svg .chart .slice:nth-of-type(1) path', 'mouseenter');
  });

  test('it responds to changing data', async function (assert) {
    assert.expect(51);
    this.set('data', [
      {
        label: 'One',
        data: 100,
      },
      {
        label: 'Two',
        data: 200,
      },
    ]);
    this.set('isIcon', false);
    this.set('hover', () => {});
    this.set('onClick', () => {});
    this.set('containerHeight', 200);
    this.set('containerWidth', 200);
    await render(hbs`<SimpleChartPie
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
      const chart = `${svg} .chart`;
      const sections = `${chart} .slice`;
      assert.dom(svg).hasAttribute('height', `${height}`);
      assert.dom(svg).hasAttribute('width', `${width}`);
      assert.dom(chart).exists();
      assert.dom(sections).exists({ count: fills.length });
      for (let i = 0; i < fills.length; i++) {
        assert
          .dom(`${sections}:nth-of-type(${i + 1}) path`)
          .hasAttribute('fill', fills[i]);
      }
      await click(`${sections}:nth-of-type(1) .slicepath`);
      await triggerEvent(`${sections}:nth-of-type(2) .slicepath`, 'mouseenter');
    };
    await check(200, 200, ['rgb(0, 191, 191)', 'rgb(255, 64, 64)']);
    this.set('data', [
      {
        label: 'One',
        data: 1,
      },
      {
        label: 'Two',
        data: 1,
      },
      {
        label: 'Three',
        data: 1,
      },
    ]);
    await check(200, 200, [
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
    ]);

    this.set('containerHeight', 24);
    await check(24, 200, [
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
    ]);
    this.set('containerWidth', 42);
    await check(24, 42, [
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
    ]);

    this.set('onClick', (obj) => {
      assert.ok(obj, 'click should be called');
    });
    await check(24, 42, [
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
    ]);

    this.set('hover', (obj) => {
      assert.ok(obj, 'hover should be called');
    });
    await check(24, 42, [
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
    ]);

    this.set('isIcon', true);
    this.set('onClick', () => {
      assert.false(true, 'onClick should not be called');
    });
    this.set('hover', () => {
      assert.false(true, 'hover should not be called');
    });
    await check(24, 42, [
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
      'rgb(255, 64, 64)',
    ]);
  });
});
