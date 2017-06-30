import Ember from 'ember';

const { get, run } = Ember;
export default Ember.Mixin.create({
  tagName: 'svg',
  attributeBindings: ['_width:width', '_height:height'],
  _width: '100%',
  _height: '100%',
  currentClientHeight: null,
  currentClientWidth: null,
  data: null,
  isIcon: false,
  resizeListener: null,
  didReceiveAttrs() {
    // Anytime we get an update schedule a draw
    run.scheduleOnce('afterRender', this, this.resize);
  },
  didInsertElement() {
    this.resizeListener = this.$(window).on('resize', run.bind(this, this.resize));
  },
  willDestroyElement: function(){
    if(this.resizeListener){
      // whenever component gets destroyed, unbind the listener
      this.$(window).off('resize', this.resizeListener);
    }
  },
  resize() {
    const currentClientHeight = get(this, 'currentClientHeight');
    const currentClientWidth = get(this, 'currentClientWidth');
    const newClientHeight = this.element.clientHeight;
    const newClientWidth = this.element.clientWidth;

    if (currentClientHeight != newClientHeight || currentClientWidth != newClientWidth) {
      this.draw(newClientHeight, newClientWidth);
      this.set('currentClientHeight', newClientHeight);
      this.set('currentClientWidth', newClientWidth);
    }
  }
});
