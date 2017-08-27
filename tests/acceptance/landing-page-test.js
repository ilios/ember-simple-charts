import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | landing page');

test('visiting /', async function(assert) {
  await visit('/');
  assert.equal(currentURL(), '/');

  percySnapshot(assert);
});
