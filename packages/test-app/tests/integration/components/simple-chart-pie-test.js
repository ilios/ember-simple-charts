import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  render,
  settled,
  findAll,
  waitUntil,
  triggerEvent,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'test-app/lib/chart-data';
import percySnapshot from '@percy/ember';

module('Integration | Component | simple chart pie', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    const svg = 'svg';
    const loaded = '.loaded';
    await render(hbs`<SimpleChartPie
      @data={{this.chartData.pie}}
      @isIcon={{false}}
      @isClickable={{false}}
      @hover={{(noop)}}
      @onClick={{(noop)}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);

    //let the chart animations finish
    await waitUntil(() => {
      return findAll(loaded).length;
    });

    percySnapshot(assert);

    assert.dom(svg).hasAttribute('height', '100%');
    assert.dom(svg).hasAttribute('width', '100%');
    assert.dom(`${svg} g:nth-of-type(1) desc`).hasText('This is totally cool.');
    await settled();
  });

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
      @containerHeight="100%"
      @containerWidth="100%"
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
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await triggerEvent('svg .chart .slice:nth-of-type(1) path', 'mouseenter');
  });
});
