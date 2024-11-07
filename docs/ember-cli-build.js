'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-simple-charts'],
    },
  });
  app.import('node_modules/highlight.js/styles/a11y-dark.css');

  return app.toTree();
};
