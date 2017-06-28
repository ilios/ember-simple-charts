import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('donut-chart');
  this.route('pie-chart');
  this.route('line-chart');
  this.route('chart-donut');
  this.route('chart-pie');
  this.route('chart-line');
  this.route('chart-legend');
  this.route('chart-horz-bar');
  this.route('chart-stacked');
  this.route('chart-bar');
});

export default Router;
