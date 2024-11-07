import { module, test } from 'qunit';
import { setupApplicationTest, chartsLoaded } from 'test-app/tests/helpers';
import { currentURL, visit } from '@ember/test-helpers';
import percySnapshot from '@percy/ember';

module('Acceptance | rendered charts', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting examples', async function (assert) {
    assert.expect(2);
    await visit('/');
    const charts = '.example';
    assert.strictEqual(currentURL(), '/');
    assert.dom(charts).exists({ count: 8 });
    await chartsLoaded();
    await percySnapshot(assert);
  });
});
