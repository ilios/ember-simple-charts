import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  settled,
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

  test('visiting examples', async function (assert) {
    await visit('/');
    const charts = '.example';
    assert.equal(currentURL(), '/');
    assert.dom(charts).exists({ count: 7 });
    await chartsLoaded();
    await percySnapshot(assert);
    await settled();
  });
});
