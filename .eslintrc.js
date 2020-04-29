'use strict';

module.exports = {
  root: true,
  extends: [
    '@ilios/eslint-config-ember-addon'
  ],
  rules: {
    'sort-imports': 0,
    'ember/no-jquery': 'error'
  },
};
