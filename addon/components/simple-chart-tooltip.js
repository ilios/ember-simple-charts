import Component from '@ember/component';
import layout from '../templates/components/simple-chart-tooltip';

export default Component.extend({
  layout,
  classNames: ['simple-chart-tooltip'],
  tetherTarget: null,
  title: null,
  content: null,
  constraints: null,
  attachment: 'bottom left',
  targetAttachment: 'middle center',

  init() {
    this._super(...arguments);
    this.set('constraints', [
      {
        to: 'scrollParent',
        attachment: 'together',
        pin: true
      }
    ]);
  }

});
