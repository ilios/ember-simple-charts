import Component from '@glimmer/component';
import { service } from '@ember/service';
import SimpleChart from 'ember-simple-charts/components/simple-chart';
import SampleCode from './sample-code';

export default class ExampleComponent extends Component {
  @service chartData;

  get data() {
    return this.chartData[this.args.name];
  }

  get sampleData() {
    return JSON.stringify(this.data, null, 2);
  }
  <template>
    <div class="example">
      <h3>
        Example
      </h3>
      <div class="medium-example">
        <SimpleChart @name={{@name}} @data={{this.data}} />
      </div>
      <SampleCode @exampleType="medium">
        <:html>
          &lt;div class="medium-example"&gt; &lt;SimpleChart @name="{{@name}}"
          @data=&#123;&#123;this.data&#125;&#125; /&gt; &lt;/div&gt;
        </:html>
        <:css>
          .medium-example { height: 250px; width: 250px; }
        </:css>
        <:data>{{this.sampleData}}</:data>
      </SampleCode>
    </div>
  </template>
}
