import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { task, taskGroup, timeout } from 'ember-concurrency';
import layout from '../templates/components/simple-chart';
const DEBOUNCE_MS = 100;
export default Component.extend({
  layout,
  classNames: ['simple-chart'],
  tagName: 'div',
  name: null,
  isIcon: false,
  tooltipTarget: null,
  chartName: computed('type', function(){
    const name = this.get('name');
    return `simple-chart-${name}`;
  }),
  isClickable: computed('click', function () {
    const click = get(this, 'click');
    return isPresent(click);
  }),
  mouse: taskGroup().restartable(),
  handleHover: task(function* (data, tooltipTarget) {
    const hover = get(this, 'hover');
    yield timeout(DEBOUNCE_MS);
      if (hover) {
        try {
          yield hover(data);
          if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
            set(this, 'tooltipTarget', tooltipTarget);
          }
        } catch (e) {
          //we will just ignore errors here since the mouse state is transient
        }
      }
  }).group('mouse'),
  handleLeave: task(function* () {
    yield timeout(DEBOUNCE_MS);
    const leave = get(this, 'leave');
    if (leave) {
      try {
        yield leave();
        if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
          set(this, 'tooltipTarget', null);
        }
      } catch (e) {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  }).group('mouse'),
  handleClick: task(function* (data) {
    const click = get(this, 'click');
    if (click) {
      try {
        yield click(data);
        if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
          set(this, 'tooltipTarget', null);
        }
      } catch (e) {
        //we will just ignore errors here since the mouse state is transient
      }
    }
  }).group('mouse'),
});
