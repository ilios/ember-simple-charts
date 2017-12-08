import Ember from 'ember';
import layout from '../templates/components/simple-chart';

const { Component, computed, get, set } = Ember;

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
        await hover(data);
        if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
          set(this, 'tooltipTarget', tooltipTarget);
        }
      }
    },
    async handleLeave() {
      const leave = get(this, 'leave');
      if (leave) {
        await leave();
      }
      if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
        set(this, 'tooltipTarget', null);
      }
    },
    async handleClick(data) {
      const click = get(this, 'click');
      if (click) {
        await click(data);
      }
      if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
        set(this, 'tooltipTarget', null);
      }
    },
  }
});
