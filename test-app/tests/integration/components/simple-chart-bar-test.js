import { module, test } from 'qunit';
import { setupRenderingTest, chartsLoaded } from 'test-app/tests/helpers';
import { click, render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'test-app/lib/chart-data';
import percySnapshot from '@percy/ember';

module('Integration | Component | simple chart bar', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(21);
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

    await render(hbs`<SimpleChartBar
      @data={{this.chartData.bar}}
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
    assert.dom(shapes).exists({ count: 4 });
    assert.dom(rect1).hasAttribute('y', '43%');
    assert.dom(rect2).hasAttribute('y', '62%');
    assert.dom(rect3).hasAttribute('y', '24%');
    assert.dom(rect4).hasAttribute('y', '5%');
    assert.dom(rect1).hasAttribute('fill', 'rgb(24, 114, 244)');
    assert.dom(rect2).hasAttribute('fill', 'rgb(24, 244, 114)');
    assert.dom(rect3).hasAttribute('fill', 'rgb(167, 3, 213)');
    assert.dom(rect4).hasAttribute('fill', 'rgb(255, 64, 64)');

    assert.dom(text).exists({ count: 4 });
    assert.dom(text1).includesText('300');
    assert.dom(text2).includesText('200');
    assert.dom(text3).includesText('400');
    assert.dom(text4).includesText('500');
    assert.ok(
      find(text1).getAttribute('style').includes('fill: rgb(255, 255, 255);'),
    );
    assert.ok(
      find(text2).getAttribute('style').includes('fill: rgb(0, 0, 0);'),
    );
    assert.ok(
      find(text3).getAttribute('style').includes('fill: rgb(255, 255, 255);'),
    );
    assert.ok(
      find(text4).getAttribute('style').includes('fill: rgb(255, 255, 255);'),
    );
    assert.dom(`${rect1} desc`).hasText('The value is 300.');
  });

  test('click event fires', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    this.set('onClick', (obj) => {
      assert.strictEqual(obj.label, '300');
      assert.strictEqual(obj.data, 300);
      assert.strictEqual(obj.meta.id, 10);
    });
    await render(hbs`<SimpleChartBar
      @data={{this.chartData.bar}}
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
      assert.strictEqual(obj.label, '300');
      assert.strictEqual(obj.data, 300);
      assert.strictEqual(obj.meta.id, 10);
    });
    await render(hbs`<SimpleChartBar
      @data={{this.chartData.bar}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{this.onHover}}
      @onClick={{(noop)}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await triggerEvent('svg .bars rect:nth-of-type(1)', 'mouseenter');
  });

  test('it responds to changing data', async function (assert) {
    assert.expect(51);
    this.set('data', [
      {
        label: '100',
        data: 100,
      },
      {
        label: '50',
        data: 50,
      },
    ]);
    this.set('isIcon', false);
    this.set('hover', () => {});
    this.set('onClick', () => {});
    this.set('containerHeight', 200);
    this.set('containerWidth', 200);
    await render(hbs`<SimpleChartBar
      @data={{this.data}}
      @isIcon={{this.isIcon}}
      @isClickable={{true}}
      @hover={{this.hover}}
      @onClick={{this.onClick}}
      @containerHeight={{this.containerHeight}}
      @containerWidth={{this.containerWidth}}
    />`);

    const check = async (height, width, fills, texts) => {
      await chartsLoaded();
      const svg = 'svg';
      const boxes = `${svg} .bars rect`;
      const text = `${svg} .bars text`;
      assert.dom(svg).hasAttribute('height', height);
      assert.dom(svg).hasAttribute('width', width);
      assert.dom(boxes).exists({ count: fills.length });
      for (let i = 0; i < fills.length; i++) {
        assert
          .dom(`${boxes}:nth-of-type(${i + 1})`)
          .hasAttribute('fill', fills[i]);
      }
      assert.dom(text).exists({ count: texts.length });
      for (let i = 0; i < texts.length; i++) {
        assert.dom(`${text}:nth-of-type(${i + 1})`).includesText(texts[i]);
      }
      await click(`${boxes}:nth-of-type(1)`);
      await triggerEvent(`${boxes}:nth-of-type(1)`, 'mouseenter');
    };
    await check(
      '200',
      '200',
      ['rgb(255, 64, 64)', 'rgb(0, 191, 191)'],
      ['100', '50'],
    );

    this.set('data', [
      {
        label: '25',
        data: 25,
      },
      {
        label: '50',
        data: 50,
      },
    ]);
    await check(
      '200',
      '200',
      ['rgb(0, 191, 191)', 'rgb(255, 64, 64)'],
      ['25', '50'],
    );

    this.set('containerHeight', 100);
    await check(
      '100',
      '200',
      ['rgb(0, 191, 191)', 'rgb(255, 64, 64)'],
      ['25', '50'],
    );
    this.set('containerWidth', 100);
    await check(
      '100',
      '100',
      ['rgb(0, 191, 191)', 'rgb(255, 64, 64)'],
      ['25', '50'],
    );
    this.set('onClick', () => {
      assert.ok(true);
    });
    await check(
      '100',
      '100',
      ['rgb(0, 191, 191)', 'rgb(255, 64, 64)'],
      ['25', '50'],
    );
    this.set('hover', () => {
      assert.ok(true);
    });
    await check(
      '100',
      '100',
      ['rgb(0, 191, 191)', 'rgb(255, 64, 64)'],
      ['25', '50'],
    );

    this.set('isIcon', true);
    this.set('onClick', () => {
      assert.false(true, 'onClick should not be called');
    });
    this.set('hover', () => {
      assert.false(true, 'hover should not be called');
    });
  });
});
