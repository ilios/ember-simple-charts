import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import SimpleChart from 'ember-simple-charts/components/simple-chart';
import SampleCode from './sample-code';

export default class TooltipExampleComponent extends Component {
  @tracked tooltipData;
  @service chartData;

  get data() {
    return this.chartData[this.args.name];
  }

  get sampleData() {
    return JSON.stringify(this.data, null, 2);
  }

  @action
  click(data) {
    alert(data.label);
  }
  <template>
    <div class="example">
      <h3>Action on Click</h3>
      <div class="example">
        <SimpleChart
          @name={{@name}}
          @data={{this.data}}
          @onClick={{this.click}}
        />
      </div>
      <SampleCode @exampleType="click">
        <:html>
          &lt;div class="icon-example"&gt; &lt;SimpleChart @name="{{@name}}"
          @data=&#123;&#123;this.data&#125;&#125;
          @onClick=&#123;&#123;this.click&#125;&#125; /&gt; &lt;/div&gt;
        </:html>
        <:css>
          .medium-example { height: 250px; width: 250px; }
        </:css>
        <:data>{{this.sampleData}}</:data>
      </SampleCode>
    </div>
  </template>
}
