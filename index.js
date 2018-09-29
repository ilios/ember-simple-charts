'use strict';

const merge = require('merge');

module.exports = {
  name: require('./package').name,
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
