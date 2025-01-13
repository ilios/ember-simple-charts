import { module, test } from 'qunit';
import { setupRenderingTest, chartsLoaded } from 'test-app/tests/helpers';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'test-app/lib/chart-data';
import percySnapshot from '@percy/ember';

module('Integration | Component | simple chart cluster', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(48);
    this.set('chartData', ChartData);
    const svg = 'svg';
    const chart = `${svg} .chart`;
    const nodes = `${chart} .nodes`;
    const node1 = `${nodes} circle:nth-of-type(1)`;
    const text1 = `${node1} desc`;
    const node2 = `${nodes} circle:nth-of-type(2)`;
    const text2 = `${node2} desc`;
    const node3 = `${nodes} circle:nth-of-type(3)`;
    const text3 = `${node3} desc`;
    const node4 = `${nodes} circle:nth-of-type(4)`;
    const text4 = `${node4} desc`;
    const node5 = `${nodes} circle:nth-of-type(5)`;
    const text5 = `${node5} desc`;
    const node6 = `${nodes} circle:nth-of-type(6)`;
    const text6 = `${node6} desc`;
    const node7 = `${nodes} circle:nth-of-type(7)`;
    const text7 = `${node7} desc`;
    const node8 = `${nodes} circle:nth-of-type(8)`;
    const text8 = `${node8} desc`;
    const node9 = `${nodes} circle:nth-of-type(9)`;
    const text9 = `${node9} desc`;

    const links = `${chart} .links`;
    const link1 = `${links} line:nth-of-type(1)`;
    const link2 = `${links} line:nth-of-type(2)`;
    const link3 = `${links} line:nth-of-type(3)`;
    const link4 = `${links} line:nth-of-type(4)`;
    const link5 = `${links} line:nth-of-type(5)`;
    const link6 = `${links} line:nth-of-type(6)`;
    const link7 = `${links} line:nth-of-type(7)`;
    const link8 = `${links} line:nth-of-type(8)`;
    await render(hbs`<SimpleChartCluster
      @data={{this.chartData.cluster}}
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
    assert.dom(nodes).exists();
    assert.dom(links).exists();
    assert.dom(node1).exists();
    assert.dom(node1).hasAttribute('fill', 'rgb(255, 64, 64)');
    assert.dom(text1).hasText('This is the root node.');
    assert.dom(link1).exists();
    assert.dom(link1).hasAttribute('stroke', 'rgb(255, 64, 64)');

    assert.dom(node2).exists();
    assert.dom(node2).hasAttribute('fill', 'rgb(127, 238, 17)');
    assert.dom(text2).hasText('This node i1.');
    assert.dom(link2).exists();
    assert.dom(link2).hasAttribute('stroke', 'rgb(255, 64, 64)');
    assert.dom(node3).exists();
    assert.dom(node3).hasAttribute('fill', 'rgb(127, 238, 17)');
    assert.dom(text3).hasText('This is node ii1');
    assert.dom(link3).exists();
    assert.dom(link3).hasAttribute('stroke', 'rgb(127, 238, 17)');

    assert.dom(node4).exists();
    assert.dom(node4).hasAttribute('fill', 'rgb(0, 191, 191)');
    assert.dom(text4).hasText('This is node i21');
    assert.dom(link4).exists();
    assert.dom(link4).hasAttribute('stroke', 'rgb(127, 238, 17)');

    assert.dom(node5).exists();
    assert.dom(node5).hasAttribute('fill', 'rgb(0, 191, 191)');
    assert.dom(text5).hasText('This is node i22');
    assert.dom(link5).exists();
    assert.dom(link5).hasAttribute('stroke', 'rgb(127, 238, 17)');

    assert.dom(node6).exists();
    assert.dom(node6).hasAttribute('fill', 'rgb(0, 191, 191)');
    assert.dom(text6).hasText('This is node i23');
    assert.dom(link6).exists();
    assert.dom(link6).hasAttribute('stroke', 'rgb(127, 238, 17)');

    assert.dom(node7).exists();
    assert.dom(node7).hasAttribute('fill', 'rgb(0, 191, 191)');
    assert.dom(text7).hasText('This is node ii21');
    assert.dom(link7).exists();
    assert.dom(link7).hasAttribute('stroke', 'rgb(0, 191, 191)');

    assert.dom(node8).exists();
    assert.dom(node8).hasAttribute('fill', 'rgb(127, 17, 238)');
    assert.dom(text8).hasText('This is node ii31');
    assert.dom(link8).exists();
    assert.dom(link8).hasAttribute('stroke', 'rgb(127, 17, 238)');

    assert.dom(node9).exists();
    assert.dom(node9).hasAttribute('fill', 'rgb(255, 64, 64)');
    assert.dom(text9).hasText('This is node ii41');
  });

  test('click event fires', async function (assert) {
    assert.expect(1);
    this.set('chartData', ChartData);
    this.set('onClick', () => {
      assert.ok(true, 'event fired.');
    });
    await render(hbs`<SimpleChartCluster
      @data={{this.chartData.cluster}}
      @isIcon={{false}}
      @isClickable={{true}}
      @hover={{(noop)}}
      @onClick={{this.onClick}}
      @containerHeight={{200}}
      @containerWidth={{200}}
    />`);
    await click('svg .nodes circle.node:nth-of-type(1)');
  });
});
