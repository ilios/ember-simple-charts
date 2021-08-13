import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | simple chart bar', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
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
      @hover={{noop}}
      @onClick={{noop}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
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
    assert.dom(text1).hasText('300');
    assert.dom(text2).hasText('200');
    assert.dom(text3).hasText('400');
    assert.dom(text4).hasText('500');
    assert.ok(
      find(text1).getAttribute('style').includes('color: rgb(255, 255, 255);')
    );
    assert.ok(
      find(text2).getAttribute('style').includes('color: rgb(0, 0, 0);')
    );
    assert.ok(
      find(text3).getAttribute('style').includes('color: rgb(255, 255, 255);')
    );
    assert.ok(
      find(text4).getAttribute('style').includes('color: rgb(255, 255, 255);')
    );
  });

  test('click event fires', async function (assert) {
    assert.expect(2);
    this.set('chartData', ChartData);
    this.set('onClick', (obj) => {
      assert.equal(obj.label, '300');
      assert.equal(obj.data, 300);
    });
    await render(hbs`<SimpleChartBar
      @data={{this.chartData.bar}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{noop}}
      @onClick={{this.onClick}}
      @containerHeight="100%"
      @containerWidth="100%"
    />`);
    await click('svg .bars rect:nth-of-type(1)');
  });
});
