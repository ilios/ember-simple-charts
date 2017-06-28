import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('donut');
  this.route('pie');
  this.route('line');
  this.route('legend');
  this.route('bar');
  this.route('horz-bar');
  this.route('stacked-bar');
});

export default Router;
