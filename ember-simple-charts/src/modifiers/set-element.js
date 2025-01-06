import { modifier } from 'ember-modifier';

export default modifier((element, [obj]) => {
  obj.element = element;
});
