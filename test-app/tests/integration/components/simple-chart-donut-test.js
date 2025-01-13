import { module, test } from 'qunit';
import { setupRenderingTest, chartsLoaded } from 'test-app/tests/helpers';
import { click, render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'test-app/lib/chart-data';
import percySnapshot from '@percy/ember';

module('Integration | Component | simple chart donut', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(26);
    this.set('chartData', ChartData);
    const svg = 'svg';
    const chart = `${svg} .chart`;
    const slices = `${chart} .slice`;
    const section1 = `${slices}:nth-of-type(1) path`;
    const section2 = `${slices}:nth-of-type(2) path`;
    const section3 = `${slices}:nth-of-type(3) path`;
    const section4 = `${slices}:nth-of-type(4) path`;

    const text = `${chart} desc`;
    const text1 = `${slices}:nth-of-type(1) desc`;
    const text2 = `${slices}:nth-of-type(2) desc`;
    const text3 = `${slices}:nth-of-type(3) desc`;
    const text4 = `${slices}:nth-of-type(4) desc`;
    await render(hbs`<SimpleChartDonut
      @data={{this.chartData.donut}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{(noop)}}
      @onClick={{this.onClick}}
      @containerHeight={{200}}
      @containerWidth={{200}}
    />`);

    await chartsLoaded();
    percySnapshot(assert);
    assert.dom(svg).hasAttribute('height', '200');
    assert.dom(svg).hasAttribute('width', '200');
    assert.dom(chart).exists({ count: 1 });
    assert.dom(chart).hasAttribute('transform', 'translate(100,100)');
    assert.dom(slices).exists({ count: 4 });
    assert.dom(section1).exists();
    assert
      .dom(section1)
      .hasAttribute(
        'd',
        'M0,-100A100,100,0,0,1,97.493,-22.252L58.496,-13.351A60,60,0,0,0,0,-60Z',
      );
    assert.dom(section1).hasAttribute('fill', 'rgb(24, 114, 244)');
    assert.dom(section1).hasAttribute('stroke', '#FFFFFF');
    assert.dom(section2).exists();
    assert
      .dom(section2)
      .hasAttribute(
        'd',
        'M97.493,-22.252A100,100,0,0,1,78.183,62.349L46.91,37.409A60,60,0,0,0,58.496,-13.351Z',
      );
    assert.dom(section2).hasAttribute('fill', 'rgb(24, 244, 114)');
    assert.dom(section2).hasAttribute('stroke', '#FFFFFF');
    assert.dom(section3).exists();
    assert
      .dom(section3)
      .hasAttribute(
        'd',
        'M78.183,62.349A100,100,0,0,1,-78.183,62.349L-46.91,37.409A60,60,0,0,0,46.91,37.409Z',
      );
    assert.dom(section3).hasAttribute('fill', 'rgb(167, 3, 213)');
    assert.dom(section3).hasAttribute('stroke', '#FFFFFF');
    assert.dom(section4).exists();
    assert
      .dom(section4)
      .hasAttribute(
        'd',
        'M-78.183,62.349A100,100,0,0,1,0,-100L0,-60A60,60,0,0,0,-46.91,37.409Z',
      );
    assert.dom(section4).hasAttribute('fill', 'rgb(255, 64, 64)');
    assert.dom(section4).hasAttribute('stroke', '#FFFFFF');

    assert.dom(text).exists({ count: 4 });
    assert.dom(text1).hasText('This is totally cool.');
    assert.dom(text2).hasText('This is way cool.');
    assert.dom(text3).hasText('This is cool as cucumber.');
    assert.dom(text4).hasText('This is so cool.');
  });

  test('click event fires', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    this.set('onClick', (obj) => {
      assert.strictEqual(obj.label, 'Totally Cool');
      assert.strictEqual(obj.data, 300);
      assert.strictEqual(obj.meta.id, 10);
    });
    await render(hbs`<SimpleChartDonut
      @data={{this.chartData.donut}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{(noop)}}
      @onClick={{this.onClick}}
      @containerHeight={{200}}
      @containerWidth={{200}}
    />`);
    await click('svg .chart .slice:nth-of-type(1) .slicepath');
  });

  test('hover event fires', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    this.set('onHover', (obj) => {
      assert.strictEqual(obj.label, 'Totally Cool');
      assert.strictEqual(obj.data, 300);
      assert.strictEqual(obj.meta.id, 10);
    });
    await render(hbs`<SimpleChartDonut
      @data={{this.chartData.donut}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{this.onHover}}
      @onClick={{(noop)}}
      @containerHeight={{200}}
      @containerWidth={{200}}
    />`);
    await triggerEvent(
      'svg .chart .slice:nth-of-type(1) .slicepath',
      'mouseenter',
    );
  });
});
