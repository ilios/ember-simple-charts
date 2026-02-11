import Component from '@glimmer/component';
import { service } from '@ember/service';
import SimpleChart from 'ember-simple-charts/components/simple-chart';
import SampleCode from './sample-code';

export default class IconExampleComponent extends Component {
  @service chartData;

  get data() {
    return this.chartData[this.args.name];
  }

  get sampleData() {
    return JSON.stringify(this.data, null, 2);
  }
  <template>
    <div class="example">
      <h3>As an icon</h3>
      <div class="icon-example">
        <SimpleChart @isIcon={{true}} @name={{@name}} @data={{this.data}} />
      </div>
      <SampleCode @exampleType="icon">
        <:html>
          &lt;div class="icon-example"&gt; &lt;SimpleChart @name="{{@name}}"
          @isIcon=&#123;&#123;true&#125;&#125;
          @data=&#123;&#123;this.data&#125;&#125; /&gt; &lt;/div&gt;
        </:html>
        <:css>
          .icon-example { height: 25px; width: 25px; }
        </:css>
        <:data>{{this.sampleData}}</:data>
      </SampleCode>
    </div>
  </template>
}
