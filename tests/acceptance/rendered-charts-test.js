import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { settled, click, findAll, currentURL, visit } from '@ember/test-helpers';
import { percySnapshot } from 'ember-percy';

module('Acceptance | rendered charts', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    assert.equal(currentURL(), '/');
    assert.equal(findAll(charts).length, 6);


    //let the chart animations finish
    later(async () => {
      await percySnapshot(assert);
    }, 1000);
    await settled();
  });

  test('visiting donut chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(1) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-donut');

    //let the chart animations finish
    later(async () => {
      await percySnapshot(assert);
    }, 1000);
    await settled();
  });

  test('visiting pie chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(2) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-pie');

    //let the chart animations finish
    later(async () => {
      await percySnapshot(assert);
    }, 1000);
    await settled();
  });

  test('visiting bar chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(3) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-bar');

    //let the chart animations finish
    later(async () => {
      await percySnapshot(assert);
    }, 1000);
    await settled();
  });

  test('visiting horz-bar chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(4) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-horz-bar');

    //let the chart animations finish
    later(async () => {
      await percySnapshot(assert);
    }, 1000);
    await settled();
  });

  test('visiting cluster chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(5) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-cluster');

    //let the chart animations finish
    later(async () => {
      await percySnapshot(assert);
    }, 1000);
    await settled();
  });

  test('visiting pack chart', async function (assert) {
    await visit('/');
    const charts = '.ember-simple-charts-wrapper .panel';
    const link = `${charts}:nth-of-type(6) a`;

    await click(link);
    assert.equal(currentURL(), '/chart-pack');

    //let the chart animations finish
    later(async () => {
      await percySnapshot(assert);
    }, 1000);
    await settled();
  });
});
