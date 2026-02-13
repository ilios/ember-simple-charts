import { click, render, triggerEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import SimpleChartTree from '#src/components/simple-chart-tree';
import { setupRenderingTest } from 'ember-qunit';
import chartsLoaded from '../../helpers/charts-loaded.js';
import ChartData from '../../helpers/chart-data.js';
import noop from '../../helpers/noop.js';

module('Integration | Component | SimpleChartTree', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    const svg = 'svg';
    await render(
      <template>
        <SimpleChartTree
          @data={{this.chartData.tree}}
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
    assert.dom(`${svg} g circle:nth-of-type(1) desc`).hasText('Root node.');
  });

  test('click event fires', async function (assert) {
    assert.expect(1);
    this.set('chartData', ChartData);
    this.set('onClick', () => {
      assert.ok(true, 'event fired.');
    });
    await render(
      <template>
        <SimpleChartTree
          @data={{this.chartData.tree}}
          @isIcon={{false}}
          @isClickable={{true}}
          @hover={{(noop)}}
          @onClick={{this.onClick}}
          @containerHeight="100%"
          @containerWidth="100%"
        />
      </template>,
    );
    await click('svg .chart .nodes circle.node:nth-of-type(1)');
  });

  test('hover event fires', async function (assert) {
    assert.expect(2);
    this.set('chartData', ChartData);
    this.set('onHover', (obj) => {
      assert.strictEqual(obj.label, 'first one');
      assert.strictEqual(obj.data, 11);
    });
    await render(
      <template>
        <SimpleChartTree
          @data={{this.chartData.tree}}
          @isIcon={{false}}
          @isClickable={{true}}
          @hover={{this.onHover}}
          @onClick={{(noop)}}
          @containerHeight={{200}}
          @containerWidth={{200}}
        />
      </template>,
    );
    await triggerEvent(
      'svg .chart .nodes circle.node:nth-of-type(2)',
      'mouseenter',
    );
  });

  test('it responds to changing data', async function (assert) {
    assert.expect(40);

    this.set('data', {
      label: 'Root',
      data: 50,
      children: [
        {
          label: 'child',
          data: 1,
          children: [
            {
              label: 'child',
              data: 1,
              children: [],
            },
          ],
        },
      ],
    });
    this.set('isIcon', false);
    this.set('hover', () => {});
    this.set('onClick', () => {});
    this.set('containerHeight', 200);
    this.set('containerWidth', 200);
    await render(
      <template>
        <SimpleChartTree
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
    const check = async (height, width, nodeFills) => {
      await chartsLoaded();
      const svg = 'svg';
      const chart = `${svg} .chart`;
      const nodes = `${chart} .nodes circle`;
      assert.dom(svg).hasAttribute('height', `${height}`);
      assert.dom(svg).hasAttribute('width', `${width}`);
      assert.dom(chart).exists();
      assert.dom(nodes).exists({ count: nodeFills.length });
      for (let i = 0; i < nodeFills.length; i++) {
        assert
          .dom(`${nodes}:nth-of-type(${i + 1})`)
          .hasAttribute('fill', nodeFills[i]);
      }
      await click(`${nodes}:nth-of-type(1)`);
      await triggerEvent(`${nodes}:nth-of-type(1)`, 'mouseenter');
    };
    await check(200, 200, [
      'rgb(255, 64, 64)',
      'rgb(0, 191, 191)',
      'rgb(255, 64, 64)',
    ]);
    this.set('data', {
      label: 'Root',
      data: 50,
      children: [],
    });
    await check(200, 200, ['rgb(0, 191, 191)']);

    this.set('containerHeight', 24);
    await check(24, 200, ['rgb(0, 191, 191)']);
    this.set('containerWidth', 42);
    await check(24, 42, ['rgb(0, 191, 191)']);
    this.set('onClick', (obj) => {
      assert.ok(obj, 'click should be called');
    });
    await check(24, 42, ['rgb(0, 191, 191)']);
    this.set('hover', (obj) => {
      assert.ok(obj, 'hover should be called');
    });
    await check(24, 42, ['rgb(0, 191, 191)']);

    this.set('isIcon', true);
    this.set('onClick', () => {
      assert.false(true, 'onClick should not be called');
    });
    this.set('hover', () => {
      assert.false(true, 'hover should not be called');
    });
    await check(24, 42, ['rgb(0, 191, 191)']);
  });
});
