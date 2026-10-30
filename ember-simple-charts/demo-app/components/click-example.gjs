import Component from '@glimmer/component';
import SimpleChart from '#src/components/simple-chart';
import chartData from '../lib/example-data.js';

export default class ClickExampleComponent extends Component {
  get data() {
    return chartData[this.args.name];
  }

  click = async (data) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    alert(data.label);
  };

  <template>
    <div class="example">
      <h3>Action on Click</h3>
      <div class="example">
        <SimpleChart
          @name={{@name}}
          @data={{this.data}}
          @onClick={{this.click}}
          data-test-click-example
        />
      </div>
    </div>
  </template>
}
