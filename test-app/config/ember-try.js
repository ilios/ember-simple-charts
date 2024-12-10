'use strict';

// const getChannelURL = require('ember-source-channel-url');, see: https://github.com/emberjs/ember.js/issues/20777
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            'ember-source': '~5.4.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            // 'ember-source': await getChannelURL('release'), see: https://github.com/emberjs/ember.js/issues/20777
            'ember-source': 'release',
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            // 'ember-source': await getChannelURL('beta'), see: https://github.com/emberjs/ember.js/issues/20777
            'ember-source': 'beta',
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            // 'ember-source': await getChannelURL('canary'), see: https://github.com/emberjs/ember.js/issues/20777
            'ember-source': 'alpha',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
