import { isDestroying, isDestroyed, registerDestructor } from '@ember/destroyable';
import { assert } from '@ember/debug';

/**
 * Replacemnet for ember-concurrency timeout
 * We tie into the ember internals and resolve this promise anytime the calling component
 * gets destroyed.
 */
function timeout(timeoutMs, owner) {
  assert('Passed timeout value must be an integer', Number.isInteger(timeoutMs));
  assert('The passed owner must be an object', typeof owner === 'object');
  return new Promise(resolve => {
    if (isDestroying(owner) || isDestroyed(owner)) {
      resolve(); //resolve imediatly if we're already destroyed
    }
    const id = setTimeout(() => {
      resolve();
    }, timeoutMs);
    registerDestructor(owner, () => {
      clearTimeout(id);
      Promise.resolve().then(() => {
        resolve();
      });
    });
  });
}

export { timeout as default };
//# sourceMappingURL=timeout.js.map
