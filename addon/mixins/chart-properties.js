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
    run.scheduleOnce('afterRender', this, this.doDraw);
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
    const newClientHeight = get(this.element, 'clientHeight');
    const newClientWidth = get(this.element, 'clientWidth');
    if (currentClientHeight != newClientHeight || currentClientWidth != newClientWidth) {
      this.doDraw();
    }
  },
  doDraw() {
    const height = get(this.element, 'clientHeight');
    const width = get(this.element, 'clientWidth');
    this.draw(height, width);
    this.set('currentClientHeight', height);
    this.set('currentClientWidth', width);
  }
});
