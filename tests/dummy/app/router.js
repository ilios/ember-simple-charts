import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('chart-donut');
  this.route('chart-pie');
  this.route('chart-bar');
  this.route('chart-horz-bar');
});

export default Router;
