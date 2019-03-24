import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  settled,
  click,
  currentURL,
  findAll,
  waitUntil,
  visit
} from '@ember/test-helpers';
import { percySnapshot } from 'ember-percy';

module('Acceptance | rendered charts', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const loaded = '.loaded';
    assert.equal(currentURL(), '/');
    assert.dom(charts).exists({ count: 7 });

    //let the chart animations finish
    await waitUntil(() => {
      return findAll(loaded).length >= 2;
    });
    await percySnapshot(assert);
    await settled();
  });

  test('visiting donut chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const loaded = '.loaded';
    const link = `${charts}:nth-of-type(1) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-donut');

    //let the chart animations finish
    await waitUntil(() => {
      return findAll(loaded).length >= 4;
    });
    await percySnapshot(assert);
    await settled();
  });

  test('visiting pie chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const loaded = '.loaded';
    const link = `${charts}:nth-of-type(2) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-pie');

    //let the chart animations finish
    await waitUntil(() => {
      return findAll(loaded).length >= 3;
    });
    await percySnapshot(assert);
    await settled();
  });

  test('visiting bar chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(3) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-bar');

    //let the chart animations finish
    await waitUntil(() => {
      return findAll('.simple-chart').length >= 3;
    });
    await percySnapshot(assert);
    await settled();
  });

  test('visiting horz-bar chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(4) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-horz-bar');

    //let the chart animations finish
    await waitUntil(() => {
      return findAll('.simple-chart').length >= 3;
    });
    await percySnapshot(assert);
    await settled();
  });

  test('visiting cluster chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(5) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-cluster');

    //let the chart animations finish
    await waitUntil(() => {
      return findAll('.simple-chart').length >= 3;
    });
    await percySnapshot(assert);
    await settled();
  });

  test('visiting pack chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(6) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-pack');

    //let the chart animations finish
    await waitUntil(() => {
      return findAll('.simple-chart').length >= 3;
    });
    await percySnapshot(assert);
    await settled();
  });

  test('visiting tree chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(7) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-tree');

    //let the chart animations finish
    await waitUntil(() => {
      return findAll('.simple-chart').length >= 3;
    });
    await percySnapshot(assert);
    await settled();
  });
});
