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
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | simple chart pie', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    this.set('chartData', ChartData);
    const svg = 'svg';
    const loaded = '.loaded';
    await render(hbs`<SimpleChartPie
      @data={{this.chartData.pie}}
      @isIcon={{false}}
      @isClickable={{false}}
      @hover={{noop}}
      @onClick={{noop}}
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

    await settled();
  });

  test('click event fires', async function (assert) {
    assert.expect(3);
    this.set('chartData', ChartData);
    this.set('onClick', (obj) => {
      assert.equal(obj.label, 'Totally Cool');
      assert.equal(obj.data, 300);
      assert.equal(obj.meta.id, 10);
    });
    await render(hbs`<SimpleChartPie
      @data={{this.chartData.pie}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{noop}}
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
      assert.equal(obj.label, 'Totally Cool');
      assert.equal(obj.data, 300);
      assert.equal(obj.meta.id, 10);
    });
    await render(hbs`<SimpleChartPie
      @data={{this.chartData.pie}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{this.onHover}}
      @onClick={{noop}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await triggerEvent('svg .chart .slice:nth-of-type(1) path', 'mouseenter');
  });
});
