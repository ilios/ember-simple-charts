import Ember from 'ember';

export function initialize(application) {
  let ChartData = Ember.Object.extend({ donut, pie, bar, horz, line, stacked, legend });
  application.register('chart-data:main', ChartData);
  application.inject('controller', 'chartData', 'chart-data:main');
}

export default {
  name: 'chart-data',
  initialize
};

const donut = [
  {
    label: 'Super Cool',
    data: 100
  },
  {
    label: 'Very Cool',
    data: 200
  },
];
const pie = [
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
];
const bar = [
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
];
const horz = [
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
];
const line = [
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
];
const stacked = [
  {
    label: 'English',
    data: 600,
    value0: 133,
    value1: 39,
    value2: 320,
    value3: 86,
    value4: 258,
    value5: 79
  },
  {
    label: 'French',
    data: 400,
    value0: 130,
    value1: 50,
    value2: 150,
    value3: 84,
    value4: 52,
    value5: 99
  },
  {
    label: 'Spainish',
    data: 900,
    value0: 77,
    value1: 88,
    value2: 202,
    value3: 50,
    value4: 38,
    value5: 49
  },
];
const legend = [
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
];
