import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('simple-chart-donut');
  this.route('simple-chart-pie');
  this.route('simple-chart-line');
  this.route('simple-chart-legend');
  this.route('simple-chart-bar');
  this.route('simple-chart-horz-bar');
  this.route('simple-chart-stacked');
  this.route('simple-chart-stacked-bar');
});

export default Router;
