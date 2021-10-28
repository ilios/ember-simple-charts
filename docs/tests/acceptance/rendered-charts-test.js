import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  settled,
  click,
  currentURL,
  findAll,
  waitUntil,
  visit,
} from '@ember/test-helpers';
import { percySnapshot } from 'ember-percy';

module('Acceptance | rendered charts', function (hooks) {
  setupApplicationTest(hooks);

  async function chartsLoaded() {
    //let the chart animations finish
    await waitUntil(() => {
      return findAll('.loading').length === 0;
    });
  }

  test('visiting /docs', async function (assert) {
    assert.expect(2);
    await visit('/docs');
    const charts = '.ember-simple-charts-wrapper .panel';
    assert.equal(currentURL(), '/docs');
    assert.dom(charts).exists({ count: 7 });
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting donut chart', async function (assert) {
    assert.expect(1);
    await visit('/docs');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(1) a`;

    await click(link);
    assert.equal(currentURL(), '/docs/donut');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting pie chart', async function (assert) {
    assert.expect(1);
    await visit('/docs');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(2) a`;

    await click(link);
    assert.equal(currentURL(), '/docs/pie');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting bar chart', async function (assert) {
    assert.expect(1);
    await visit('/docs');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(3) a`;

    await click(link);
    assert.equal(currentURL(), '/docs/bar');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting horz-bar chart', async function (assert) {
    assert.expect(1);
    await visit('/docs');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(4) a`;

    await click(link);
    assert.equal(currentURL(), '/docs/horz-bar');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting cluster chart', async function (assert) {
    assert.expect(1);
    await visit('/docs');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(5) a`;

    await click(link);
    assert.equal(currentURL(), '/docs/cluster');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting pack chart', async function (assert) {
    assert.expect(1);
    await visit('/docs');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(6) a`;

    await click(link);
    assert.equal(currentURL(), '/docs/pack');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting tree chart', async function (assert) {
    assert.expect(1);
    await visit('/docs');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(7) a`;

    await click(link);
    assert.equal(currentURL(), '/docs/tree');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });
});
