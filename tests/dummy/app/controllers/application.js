import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  donutData: [
    {
      label: 'Super Cool',
      data: 100
    },
    {
      label: 'Very Cool',
      data: 200
    },
  ],
  pieData: [
    {
      label: 'Totally Cool',
      data: 300
    },
    {
      label: 'Way Cool',
      data: 200
    },
    {
      label: 'Cucumber Cool',
      data: 400
    },
    {
      label: 'So Cool',
      data: 500
    },
  ]
});
