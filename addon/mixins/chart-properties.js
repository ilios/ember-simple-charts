/* eslint ember/no-new-mixins:0 */
import Mixin from '@ember/object/mixin';
import { run } from '@ember/runloop';
import { set, get } from '@ember/object';
import ResizeAware from 'ember-resize-aware/mixins/resize-aware';

export default Mixin.create(ResizeAware, {
  tagName: 'svg',
  attributeBindings: ['_width:width', '_height:height', '_xmlns:xmlns'],
  _width: '100%',
  _height: '100%',
  _xmlns: 'http://www.w3.org/2000/svg',
  currentClientHeight: null,
  currentClientWidth: null,
  data: null,
  isIcon: false,
  resizeListener: null,
  isClickable: false,
  didReceiveAttrs() {
    // Anytime we get an update schedule a draw
    run.scheduleOnce('afterRender', this, this.doDraw);
  },
  didResize(newClientWidth, newClientHeight) {
    const currentClientHeight = get(this, 'currentClientHeight');
    const currentClientWidth = get(this, 'currentClientWidth');
    if (currentClientHeight != newClientHeight || currentClientWidth != newClientWidth) {
      this.doDraw();
    }
  },
  doDraw() {
    let rect = { height: 0, width: 0 };
    if (this.element) {
      rect = this.element.getBoundingClientRect();
    }
    const { height, width } = rect;

    this.draw(height, width);
    if ( !(get(this, 'isDestroyed') || get(this, 'isDestroying')) ) {
      set(this, 'currentClientHeight', height);
      set(this, 'currentClientWidth', width);
    }
  }
});
