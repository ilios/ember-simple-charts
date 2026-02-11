import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import SimpleChart from 'ember-simple-charts/components/simple-chart';
import SampleCode from './sample-code.js';

export default class ResponsiveExampleComponent extends Component {
  @service chartData;

  get data() {
    return this.chartData[this.args.name];
  }

  get sampleData() {
    return JSON.stringify(this.data, null, 2);
  }
  <template>
    <div class="example">
      <h3>Responsive to container size</h3>
      <div class="large-example">
        <SimpleChart @name={{@name}} @data={{this.data}} />
      </div>
      <SampleCode @exampleType="responsive">
        <:html>
          &lt;div class="large-example"&gt; &lt;SimpleChart @name="{{@name}}"
          @data=&#123;&#123;this.data&#125;&#125; /&gt; &lt;/div&gt;
        </:html>
        <:css>
          .large-example { height: 500px; width: 500px; @media only screen and
          (max-width: 900px) { height: 250px; width: 250px; } }
        </:css>
        <:data>{{this.sampleData}}</:data>
      </SampleCode>
    </div>
  </template>
}
