import Ember from 'ember';
import layout from '../templates/components/simple-chart-tooltip';

const { Component } = Ember;

export default Component.extend({
  layout,
  classNames: ['simple-chart-tooltip'],
  tetherTarget: null,
  title: null,
  content: null,
  attachment: 'bottom left',
  targetAttachment: 'middle center',

  constraints: [
    {
      to: 'scrollParent',
      attachment: 'together',
      pin: true
    }
  ],
});
