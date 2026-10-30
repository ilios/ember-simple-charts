import Component from '@glimmer/component';
import SimpleChart from '#src/components/simple-chart';
import chartData from '../lib/example-data.js';

export default class ResponsiveExampleComponent extends Component {
  get data() {
    return chartData[this.args.name];
  }

  <template>
    <div class="example">
      <h3>Responsive to container size</h3>
      <div class="large-example">
        <SimpleChart @name={{@name}} @data={{this.data}} />
      </div>
    </div>
  </template>
}
