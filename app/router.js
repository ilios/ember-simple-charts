import config from '@ember-simple-charts/root/config/environment';
import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  docsRoute(this, function () {
    this.route('donut');
    this.route('pie');
    this.route('bar');
    this.route('horz-bar');
    this.route('cluster');
    this.route('pack');
    this.route('tree');
  });
  this.route('not-found', { path: '/*path' });
});
