import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  settled,
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

  test('visiting examples', async function (assert) {
    assert.expect(2);
    await visit('/');
    const charts = '.example';
    assert.strictEqual(currentURL(), '/');
    assert.dom(charts).exists({ count: 8 });
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });
});
