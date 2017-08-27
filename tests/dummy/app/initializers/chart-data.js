import ChartData from '../../chart-data';

export function initialize(application) {
  application.register('chart-data:main', ChartData);
  application.inject('controller', 'chartData', 'chart-data:main');
}

export default {
  name: 'chart-data',
  initialize
};
