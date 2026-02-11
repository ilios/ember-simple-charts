import { module, test } from 'qunit';
import { setupApplicationTest, chartsLoaded } from 'docs/tests/helpers';
import { click, currentURL, visit } from '@ember/test-helpers';
import percySnapshot from '@percy/ember';

module('Acceptance | rendered charts', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');
    const charts = '.wrapper .panel';
    assert.strictEqual(currentURL(), '/');
    assert.dom(charts).exists({ count: 8 });
    await chartsLoaded();
    await percySnapshot(assert);
  });

  test('visiting donut chart', async function (assert) {
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(1) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/donut');
    await chartsLoaded();
    await percySnapshot(assert);
  });

  test('visiting pie chart', async function (assert) {
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(2) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/pie');
    await chartsLoaded();
    await percySnapshot(assert);
  });

  test('visiting bar chart', async function (assert) {
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(3) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/bar');
    await chartsLoaded();
    await percySnapshot(assert);
  });

  test('visiting horz-bar chart', async function (assert) {
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(4) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/horz-bar');
    await chartsLoaded();
    await percySnapshot(assert);
  });

  test('visiting cluster chart', async function (assert) {
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(5) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/cluster');
    await chartsLoaded();
    await percySnapshot(assert);
  });

  test('visiting pack chart', async function (assert) {
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(6) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/pack');
    await chartsLoaded();
    await percySnapshot(assert);
  });

  test('visiting tree chart', async function (assert) {
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(7) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/tree');
    await chartsLoaded();
    await percySnapshot(assert);
  });

  test('visiting box chart', async function (assert) {
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(8) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/box');
    await chartsLoaded();
    await percySnapshot(assert);
  });
});
