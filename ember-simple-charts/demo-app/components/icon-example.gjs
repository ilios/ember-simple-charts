import Component from '@glimmer/component';
import SimpleChart from '#src/components/simple-chart';
import chartData from '../lib/example-data.js';

export default class IconExampleComponent extends Component {
  get data() {
    return chartData[this.args.name];
  }

  <template>
    <div class="example">
      <h3>As an icon</h3>
      <div class="icon-example">
        <SimpleChart @isIcon={{true}} @name={{@name}} @data={{this.data}} />
      </div>
    </div>
  </template>
}
