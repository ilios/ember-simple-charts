import { click, render, triggerEvent, waitFor } from '@ember/test-helpers';
import { module, test } from 'qunit';
import SimpleChart from '#src/components/simple-chart';
import SimpleChartBox from '#src/components/simple-chart-box';
import { setupRenderingTest } from 'ember-qunit';
import chartsLoaded from '../../helpers/charts-loaded.js';
import ChartData from '../../helpers/chart-data.js';
import noop from '../../helpers/noop.js';

module('Integration | Component | SimpleChartBox', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(6);
    this.set('chartData', ChartData);
    const svg = 'svg';
    const box = `${svg} .box rect`;

    await render(
      <template>
        <SimpleChartBox
          @data={{this.chartData.box}}
          @isIcon={{false}}
          @isClickable={{false}}
          @hover={{(noop)}}
          @onClick={{(noop)}}
          @containerHeight="100%"
          @containerWidth="100%"
        />
      </template>,
    );
    await chartsLoaded();

    assert.dom(svg).hasAttribute('height', '100%');
    assert.dom(svg).hasAttribute('width', '100%');
    assert.dom(box).exists({ count: 1 });
    assert.dom(box).hasAttribute('x', '0');
    assert.dom(box).hasAttribute('y', '0');
    assert.dom(box).hasAttribute('fill', 'rgb(24, 244, 114)');
  });

  test('click event fires', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    this.set('onClick', (obj) => {
      assert.strictEqual(obj.label, '200');
      assert.strictEqual(obj.data, 200);
      assert.strictEqual(obj.meta.id, 20);
    });
    await render(
      <template>
        <SimpleChartBox
          @data={{this.chartData.box}}
          @isIcon={{false}}
          @isClickable={{true}}
          @hover={{(noop)}}
          @onClick={{this.onClick}}
          @containerHeight="100%"
          @containerWidth="100%"
        />
      </template>,
    );
    await click('svg .box rect');
  });

  test('hover event fires', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    this.set('onHover', (obj) => {
      assert.strictEqual(obj.label, '200');
      assert.strictEqual(obj.data, 200);
      assert.strictEqual(obj.meta.id, 20);
    });
    await render(
      <template>
        <SimpleChartBox
          @data={{this.chartData.box}}
          @isIcon={{false}}
          @isClickable={{true}}
          @hover={{this.onHover}}
          @onClick={{(noop)}}
          @containerHeight="100%"
          @containerWidth="100%"
        />
      </template>,
    );
    await triggerEvent('svg .box rect', 'mouseenter');
  });

  test('matches donut color', async function (assert) {
    assert.expect(2);
    this.set('boxData', {
      allData: ChartData.donut,
      boxData: ChartData.donut[3],
    });
    this.set('chartData', ChartData);
    await render(
      <template>
        <SimpleChart
          @name="donut"
          @data={{this.chartData.donut}}
          @isIcon={{true}}
        />
        <SimpleChart @name="box" @data={{this.boxData}} @isIcon={{true}} />
      </template>,
    );
    await chartsLoaded();
    await waitFor('.simple-chart-donut .slice:nth-of-type(4) path');
    await waitFor('.simple-chart-box rect');

    assert
      .dom('.simple-chart-donut .slice:nth-of-type(4) path')
      .hasAttribute('fill', 'rgb(255, 64, 64)');
    assert
      .dom('.simple-chart-box rect')
      .hasAttribute('fill', 'rgb(255, 64, 64)');
  });

  test('matches pie color', async function (assert) {
    assert.expect(2);
    this.set('boxData', {
      allData: ChartData.pie,
      boxData: ChartData.pie[2],
    });
    this.set('chartData', ChartData);
    await render(
      <template>
        <SimpleChart
          @name="pie"
          @data={{this.chartData.pie}}
          @isIcon={{true}}
        />
        <SimpleChart @name="box" @data={{this.boxData}} @isIcon={{true}} />
      </template>,
    );
    await chartsLoaded();
    await waitFor('.simple-chart-pie .slice:nth-of-type(4) path');
    await waitFor('.simple-chart-box rect');

    assert
      .dom('.simple-chart-pie .slice:nth-of-type(3) path')
      .hasAttribute('fill', 'rgb(167, 3, 213)');
    assert
      .dom('.simple-chart-box rect')
      .hasAttribute('fill', 'rgb(167, 3, 213)');
  });

  test('matches bar color', async function (assert) {
    assert.expect(2);
    this.set('boxData', {
      allData: ChartData.bar,
      boxData: ChartData.bar[2],
    });
    this.set('chartData', ChartData);
    await render(
      <template>
        <SimpleChart
          @name="bar"
          @data={{this.chartData.bar}}
          @isIcon={{true}}
        />
        <SimpleChart @name="box" @data={{this.boxData}} @isIcon={{true}} />
      </template>,
    );
    await chartsLoaded();
    await waitFor('.simple-chart-bar rect');
    await waitFor('.simple-chart-box rect');

    assert
      .dom('.simple-chart-bar rect:nth-of-type(3)')
      .hasAttribute('fill', 'rgb(167, 3, 213)');
    assert
      .dom('.simple-chart-box rect')
      .hasAttribute('fill', 'rgb(167, 3, 213)');
  });

  test('matches horzBar color', async function (assert) {
    assert.expect(2);
    this.set('boxData', {
      allData: ChartData.horzBar,
      boxData: ChartData.horzBar[3],
    });
    this.set('chartData', ChartData);
    await render(
      <template>
        <SimpleChart
          @name="horz-bar"
          @data={{this.chartData.horzBar}}
          @isIcon={{true}}
        />
        <SimpleChart @name="box" @data={{this.boxData}} @isIcon={{true}} />
      </template>,
    );
    await chartsLoaded();
    await waitFor('.simple-chart-horz-bar rect');
    await waitFor('.simple-chart-box rect');

    assert
      .dom('.simple-chart-horz-bar rect:nth-of-type(4)')
      .hasAttribute('fill', 'rgb(255, 64, 64)');
    assert
      .dom('.simple-chart-box rect')
      .hasAttribute('fill', 'rgb(255, 64, 64)');
  });

  test('it responds to changing data', async function (assert) {
    assert.expect(45);
    const data = [
      {
        label: '100',
        data: 100,
      },
      {
        label: '50',
        data: 50,
      },
    ];
    this.set('data', {
      allData: data,
      boxData: data[0],
    });
    this.set('isIcon', false);
    this.set('hover', () => {});
    this.set('onClick', () => {});
    this.set('containerHeight', '100%');
    this.set('containerWidth', '100%');
    await render(
      <template>
        <SimpleChartBox
          @data={{this.data}}
          @isIcon={{this.isIcon}}
          @isClickable={{true}}
          @hover={{this.hover}}
          @onClick={{this.onClick}}
          @containerHeight={{this.containerHeight}}
          @containerWidth={{this.containerWidth}}
        />
      </template>,
    );

    const check = async (height, width, x, y, fill) => {
      await chartsLoaded();
      const svg = 'svg';
      const box = `${svg} .box rect`;
      assert.dom(svg).hasAttribute('height', height);
      assert.dom(svg).hasAttribute('width', width);
      assert.dom(box).exists({ count: 1 });
      assert.dom(box).hasAttribute('x', x);
      assert.dom(box).hasAttribute('y', y);
      assert.dom(box).hasAttribute('fill', fill);
      await click(box);
      await triggerEvent(box, 'mouseenter');
    };
    await check('100%', '100%', '0', '0', 'rgb(255, 64, 64)');

    this.set('data', {
      allData: data,
      boxData: data[1],
    });

    await check('100%', '100%', '0', '0', 'rgb(0, 191, 191)');

    this.set('containerHeight', '50%');
    await check('50%', '100%', '0', '0', 'rgb(0, 191, 191)');

    this.set('containerWidth', '50%');
    await check('50%', '50%', '0', '0', 'rgb(0, 191, 191)');

    this.set('onClick', (obj) => {
      assert.ok(obj, 'click should be called');
    });
    await check('50%', '50%', '0', '0', 'rgb(0, 191, 191)');

    this.set('hover', (obj) => {
      assert.ok(obj, 'hover should be called');
    });
    await check('50%', '50%', '0', '0', 'rgb(0, 191, 191)');

    this.set('isIcon', true);
    this.set('onClick', () => {
      assert.false(true, 'onClick should not be called');
    });
    this.set('hover', () => {
      assert.false(true, 'hover should not be called');
    });
    await check('50%', '50%', '0', '0', 'rgb(0, 191, 191)');
  });
});
