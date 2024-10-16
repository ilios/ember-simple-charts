import { module, test } from 'qunit';
import { setupRenderingTest, chartsLoaded } from 'test-app/tests/helpers';
import { click, render, triggerEvent, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'test-app/lib/chart-data';
import percySnapshot from '@percy/ember';

module('Integration | Component | simple chart box', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(6);
    this.set('chartData', ChartData);
    const svg = 'svg';
    const box = `${svg} .box rect`;

    await render(hbs`<SimpleChartBox
      @data={{this.chartData.box}}
      @isIcon={{false}}
      @isClickable={{false}}
      @hover={{(noop)}}
      @onClick={{(noop)}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await chartsLoaded();
    percySnapshot(assert);

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
    await render(hbs`<SimpleChartBox
      @data={{this.chartData.box}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{(noop)}}
      @onClick={{this.onClick}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
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
    await render(hbs`<SimpleChartBox
      @data={{this.chartData.box}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{this.onHover}}
      @onClick={{(noop)}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await triggerEvent('svg .box rect', 'mouseenter');
  });

  test('matches donut color', async function (assert) {
    assert.expect(2);
    this.set('boxData', {
      allData: ChartData.donut,
      boxData: ChartData.donut[3],
    });
    this.set('chartData', ChartData);
    await render(hbs`
      <SimpleChart
        @name="donut"
        @data={{this.chartData.donut}}
        @isIcon={{true}}
      />
      <SimpleChart
        @name="box"
        @data={{this.boxData}}
        @isIcon={{true}}
      />
    `);
    await chartsLoaded();
    await waitFor('.simple-chart-donut .slice:nth-of-type(4) path');
    await waitFor('.simple-chart-box rect');
    percySnapshot(assert);

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
    await render(hbs`
      <SimpleChart
        @name="pie"
        @data={{this.chartData.pie}}
        @isIcon={{true}}
      />
      <SimpleChart
        @name="box"
        @data={{this.boxData}}
        @isIcon={{true}}
      />
    `);
    await chartsLoaded();
    await waitFor('.simple-chart-pie .slice:nth-of-type(4) path');
    await waitFor('.simple-chart-box rect');
    percySnapshot(assert);

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
    await render(hbs`
      <SimpleChart
        @name="bar"
        @data={{this.chartData.bar}}
        @isIcon={{true}}
      />
      <SimpleChart
        @name="box"
        @data={{this.boxData}}
        @isIcon={{true}}
      />
    `);
    await chartsLoaded();
    await waitFor('.simple-chart-bar rect');
    await waitFor('.simple-chart-box rect');
    percySnapshot(assert);

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
    await render(hbs`
      <SimpleChart
        @name="horz-bar"
        @data={{this.chartData.horzBar}}
        @isIcon={{true}}
      />
      <SimpleChart
        @name="box"
        @data={{this.boxData}}
        @isIcon={{true}}
      />
    `);
    await chartsLoaded();
    await waitFor('.simple-chart-horz-bar rect');
    await waitFor('.simple-chart-box rect');
    percySnapshot(assert);

    assert
      .dom('.simple-chart-horz-bar rect:nth-of-type(4)')
      .hasAttribute('fill', 'rgb(255, 64, 64)');
    assert
      .dom('.simple-chart-box rect')
      .hasAttribute('fill', 'rgb(255, 64, 64)');
  });
});
