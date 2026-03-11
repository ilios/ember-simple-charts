import { module, test } from 'qunit';
import { setupApplicationTest, chartsLoaded } from 'docs/tests/helpers';
import { click, visit } from '@ember/test-helpers';

module('Acceptance | chart actions', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    this.originalAlert = window.alert;
  });
  hooks.afterEach(async function () {
    window.alert = this.originalAlert;
  });

  test('clicking donut chart', async function (assert) {
    await visit('/donut');
    await chartsLoaded();

    window.alert = function (data) {
      assert.strictEqual(data, 'Totally Cool');
      assert.step('alert');
    };
    await click('[data-test-click-example] .slice:nth-of-type(1) .slicepath');
    assert.verifySteps(['alert']);
  });
});
