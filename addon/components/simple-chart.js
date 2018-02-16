import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import layout from '../templates/components/simple-chart';

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
  actions: {
    async handleHover(data, tooltipTarget) {
      const hover = get(this, 'hover');
      if (hover) {
        try {
          await hover(data);
          if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
            set(this, 'tooltipTarget', tooltipTarget);
          }
        } catch (e) {
          //we will just ignore errors here since the mouse state is transient
        }
      }
    },
    async handleLeave() {
      const leave = get(this, 'leave');
      if (leave) {
        try {
          await leave();
          if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
            set(this, 'tooltipTarget', null);
          }
        } catch (e) {
          //we will just ignore errors here since the mouse state is transient
        }
      }
    },
    async handleClick(data) {
      const click = get(this, 'click');
      if (click) {
        try {
          await click(data);
          if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
            set(this, 'tooltipTarget', null);
          }
        } catch (e) {
          //we will just ignore errors here since the mouse state is transient
        }
      }
    },
  }
});
