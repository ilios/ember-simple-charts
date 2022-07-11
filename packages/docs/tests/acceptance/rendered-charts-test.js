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
import percySnapshot from '@percy/ember';

module('Acceptance | rendered charts', function (hooks) {
  setupApplicationTest(hooks);

  async function chartsLoaded() {
    //let the chart animations finish
    await waitUntil(() => {
      return findAll('.loading').length === 0;
    });
  }

  test('visiting /', async function (assert) {
    assert.expect(2);
    await visit('/');
    const charts = '.wrapper .panel';
    assert.strictEqual(currentURL(), '/');
    assert.dom(charts).exists({ count: 7 });
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting donut chart', async function (assert) {
    assert.expect(1);
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(1) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/donut');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting pie chart', async function (assert) {
    assert.expect(1);
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(2) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/pie');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting bar chart', async function (assert) {
    assert.expect(1);
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(3) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/bar');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting horz-bar chart', async function (assert) {
    assert.expect(1);
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(4) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/horz-bar');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting cluster chart', async function (assert) {
    assert.expect(1);
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(5) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/cluster');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting pack chart', async function (assert) {
    assert.expect(1);
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(6) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/pack');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });

  test('visiting tree chart', async function (assert) {
    assert.expect(1);
    await visit('/');
    const charts = '.wrapper .panel';
    const link = `${charts}:nth-of-type(7) a`;

    await click(link);
    assert.strictEqual(currentURL(), '/tree');
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });
});
