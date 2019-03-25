export function initialize(appInstance) {
  appInstance.inject('controller', 'chartData', 'service:chartData');
}

export default {
  initialize
};
