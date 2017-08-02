import Ember from 'ember';
import layout from '../templates/components/simple-chart';
const { Component, computed, get } = Ember;

export default Component.extend({
  layout,
  classNames: ['simple-chart'],
  tagName: 'div',
  name: null,
  isIcon: false,
  tooltip: null,
  tooltipSlice: null,
  tooltipLocation: null,
  chartName: computed('type', function(){
    const name = this.get('name');
    return `simple-chart-${name}`;
  }),

  actions: {
    hover(data, slice, tooltipLocation){
      const hover = get(this, 'hover');
      if (hover) {
        hover(data);
        this.set('tooltipSlice', slice);
        this.set('tooltipLocation', tooltipLocation);
      }
    },
    click(data, slice, tooltipLocation){
      const click = get(this, 'click');
      if (click) {
        click(data);
        this.set('tooltipSlice', slice);
        this.set('tooltipLocation', tooltipLocation);
      }
    },
    leave(){
      const leave = get(this, 'leave');
      if (leave) {
        leave();
        this.set('tooltipSlice', null);
        this.set('tooltipLocation', null);
      }
    },
  }
});
