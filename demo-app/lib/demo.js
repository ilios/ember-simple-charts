import { capitalize, camelize } from '@ember/string';
import ChartData from './chart-data.js';

class Demo {
  tooltipData;
  chartData = ChartData;
  chartTypes = ['bar', 'cluster', 'donut', 'horz-bar', 'pack', 'pie', 'tree'];
  get charts() {
    return this.chartTypes.map((name) => {
      const nm = camelize(name);
      return {
        name,
        title: capitalize(name),
        data: nm,
        clickHandler: this[`${nm}Click`],
      };
    });
  }
  barClick({ label, data }) {
    alert(`Clicked "${label}: ${data}"`);
  }
  clusterClick({ name, children }) {
    alert(`Clicked "${name}: ${children.length}"`);
  }
  donutClick({ label, data }) {
    alert(`Clicked "${label}: ${data}"`);
  }
  horzBarClick({ label, data }) {
    alert(`Clicked "${label}: ${data}"`);
  }
  packClick({ label, children }) {
    alert(`Clicked "${label}: ${children.length}"`);
  }
  pieClick({ label, data }) {
    alert(`Clicked "${label}: ${data}"`);
  }
  treeClick({ label, children }) {
    alert(`Clicked "${label}: ${children.length}"`);
  }
  setToolTipData = (data) => {
    this.tooltipData = data;
  };
}

export default new Demo();
