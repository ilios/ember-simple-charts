import Mixin from '@ember/object/mixin';
import { run } from '@ember/runloop';
import { set, get } from '@ember/object';
export default Mixin.create({
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
    const newClientHeight = this.element?get(this.element, 'clientHeight'):0;
    const newClientWidth = this.element?get(this.element, 'clientWidth'):0;
    if (currentClientHeight != newClientHeight || currentClientWidth != newClientWidth) {
      this.doDraw();
    }
  },
  doDraw() {
    const height = this.element?get(this.element, 'clientHeight'):0;
    const width = this.element?get(this.element, 'clientWidth'):0;
    this.draw(height, width);
    if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
      set(this, 'currentClientHeight', height);
      set(this, 'currentClientWidth', width);
    }
  }
});
