import Ember from 'ember';
import layout from '../templates/components/simple-chart';
import ResizeAware from 'ember-resize/mixins/resize-aware';
const { Component, computed, get } = Ember;

export default Component.extend(ResizeAware, {
  layout,
  didInsertElement(){
    this._super(...arguments);
    const {height, width} = this.$()[0].getClientRects()[0];
    this.setProperties({ height, width });
  },
  resizeWidthSensitive: true,
  resizeHeightSensitive: true,
  classNames: ['simple-chart'],
  tagName: 'div',
  name: null,
  width: 0,
  height: 0,
  svgWidth: computed('width', function(){
    const width = this.get('width');

    return width * .90;
  }),
  svgHeight: computed('height', function(){
    const height = this.get('height');

    return height * .90;
  }),
  tooltip: null,
  tooltipSlice: null,
  tooltipLocation: null,
  debouncedDidResize(width, height) {
    this.setProperties({width, height});
  },
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
