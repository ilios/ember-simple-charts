// taken from Ember Composable Helpers (https://github.com/DockYard/ember-composable-helpers)
import { helper } from '@ember/component/helper';

export default helper(function noop() {
  return () => {};
});
