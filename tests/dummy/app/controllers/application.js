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
  ],
  barData: [
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
  ],
  horzData: [
    {
      label: 'Mark',
      data: 150
    },
    {
      label: 'John',
      data: 200
    },
    {
      label: 'Kathy',
      data: 300
    },
    {
      label: 'Jeff',
      data: 350
    },
    {
      label: 'Joe',
      data: 100
    },
    {
      label: 'Kelly',
      data: 200
    },
    {
      label: 'Kathy',
      data: 450
    },
    {
      label: 'Jason',
      data: 350
    }
  ],
  lineData: [
    {
      label: '0',
      data: 0
    },
    {
      label: '10',
      data: 20
    },
    {
      label: '20',
      data: 30
    },
    {
      label: '30',
      data: 60
    },
    {
      label: '40',
      data: 70
    },
    {
      label: '70',
      data: 90
    }
  ],
  stackedData: [
    {
      label: 'Englis',
      data: 900,
      value1: 190,
      value2: 210,
      value3: 320,
      value4: 50,
      value5: 430,
      value6: 600
    },
    {
      label: 'French',
      data: 500,
      value1: 100,
      value2: 50,
      value3: 150,
      value4: 88,
      value5: 52,
      value6: 99
    },
    {
      label: 'Spainish',
      data: 500,
      value1: 10,
      value2: 40,
      value3: 202,
      value4: 90,
      value5: 38,
      value6: 49
    },
  ],
  legendData: [
    {
      label: '1',
      data: 6000,
    },
    {
      label: '2',
      data: 5000
    },
    {
      label: '3',
      data: 8000
    },
    {
      label: '4',
      data: 4000
    },
    {
      label: '5',
      data: 9000
    },
    {
      label: '6',
      data: 1000
    },
    {
      label: '7',
      data: 3000
    },
    {
      label: '8',
      data: 10000
    },
  ]
});
