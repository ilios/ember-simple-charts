import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('chart-donut');
  this.route('chart-pie');
  this.route('chart-bar');
  this.route('chart-horz-bar');
  this.route('chart-cluster');
  this.route('chart-pack');
});

export default Router;
