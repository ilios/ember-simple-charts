/* eslint-env node */
'use strict';

const merge = require('merge');

module.exports = {
  name: 'ember-simple-charts',
  config: function(environment, appConfig) {
    let initialConfig = merge({}, appConfig);
    let updatedConfig = this.addons.reduce((config, addon) => {
      if (addon.config) {
        merge(config, addon.config(environment, config));
      }
      return config;
    }, initialConfig);
    return updatedConfig;
  }
};
