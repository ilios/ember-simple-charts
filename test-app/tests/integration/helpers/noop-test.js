import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | noop', function (hooks) {
  setupRenderingTest(hooks);

  test('nothing happens when invoked', async function (assert) {
    assert.expect(0);
    await render(hbs`<button type="button" {{on "click" (noop)}}></button>`);
    await click('button');
  });
});
