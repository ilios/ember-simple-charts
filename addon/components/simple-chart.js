import Ember from 'ember';
import layout from '../templates/components/simple-chart';
import { task } from 'ember-concurrency';

const { Component, computed, get } = Ember;

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
  handleHover: task(function * (data, tooltipTarget) {
    const hover = get(this, 'hover');
    if (hover) {
      yield hover(data);
      this.set('tooltipTarget', tooltipTarget);
    }
  }),
  handleLeave: task(function * () {
    const leave = get(this, 'leave');
    if (leave) {
      yield leave();
    }
    this.set('tooltipTarget', null);
  }).drop(),
  handleClick: task(function * (data) {
    const click = get(this, 'click');
    if (click) {
      yield click(data);
    }
    this.set('tooltipTarget', null);
  }),
});
