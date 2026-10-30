import timeout from '#src/utils/timeout';
import { module, test, todo } from 'qunit';
import { destroy } from '@ember/destroyable';
import { settled } from '@ember/test-helpers';

const TIMEOUT = 1234;
const DELTA = 250;

module('Unit | Utility | timeout', function () {
  test('it waits', async function (assert) {
    const start = Date.now();
    await timeout(TIMEOUT, this);
    const end = Date.now();
    const time = end - start;
    assert.ok(time >= TIMEOUT);
    assert.closeTo(time, TIMEOUT, DELTA);
  });

  test('it stops waiting when owner is destroyed', async function (assert) {
    const owner = {};
    const start = Date.now();
    setTimeout(() => destroy(owner), 50);
    await timeout(TIMEOUT, owner);
    const end = Date.now();
    const time = end - start;
    assert.ok(time < TIMEOUT);
    assert.closeTo(time, 0, DELTA);
  });

  test('it stops waiting when already destroyed', async function (assert) {
    const owner = {};
    const start = Date.now();
    destroy(owner);
    await timeout(TIMEOUT, owner);
    const end = Date.now();
    const time = end - start;
    assert.closeTo(time, 0, DELTA);
  });

  // works in the browser, but not in CI probably because of an
  // issue with the isDevelopingApp embroider macro
  todo('settled waits for it', async function (assert) {
    const owner = {};
    const start = Date.now();
    timeout(TIMEOUT, owner);
    await settled();
    const end = Date.now();
    const time = end - start;
    assert.closeTo(time, TIMEOUT, DELTA);
  });

  test('settled stops waiting when owner destroyed', async function (assert) {
    const owner = {};
    const start = Date.now();
    timeout(TIMEOUT, owner);
    destroy(owner);
    await settled();
    const end = Date.now();
    const time = end - start;
    assert.closeTo(time, 0, DELTA);
  });
});
