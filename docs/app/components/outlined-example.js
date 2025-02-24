import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class OutlinedExampleComponent extends Component {
  @service chartData;

  get data() {
    return this.chartData[this.args.name];
  }

  get sampleData() {
    return JSON.stringify(this.data, null, 2);
  }
}
