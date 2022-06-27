import EmberRouter from '@ember/routing/router';
import config from 'docs/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('donut');
  this.route('pie');
  this.route('bar');
  this.route('horz-bar');
  this.route('cluster');
  this.route('pack');
  this.route('tree');
});
