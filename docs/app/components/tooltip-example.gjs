import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import SimpleChart from 'ember-simple-charts/components/simple-chart';
import { fn, concat } from '@ember/helper';
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
  setTooltipData(data) {
    this.tooltipData = data;
  }
  <template>
    <div class="example">
      <h3>With Tooltips</h3>
      <div class="medium-example">
        <SimpleChart
          @name={{@name}}
          @data={{this.data}}
          @hover={{this.setTooltipData}}
          @leave={{fn this.setTooltipData null}}
          as |chart|
        >
          {{#if this.tooltipData}}
            <chart.tooltip
              @title={{concat
                this.tooltipData.label
                " ("
                this.tooltipData.data
                ")"
              }}
            >
              {{this.chartData.ipsum}}
            </chart.tooltip>
          {{/if}}
        </SimpleChart>
      </div>
      <SampleCode @exampleType="tooltip">
        <:html>
          &lt;div class="icon-example"&gt; &lt;SimpleChart @name="{{@name}}"
          @data=&#123;&#123;this.data&#125;&#125;
          @hover=&#123;&#123;this.setTooltipData&#125;&#125;
          @leave=&#123;&#123;fn this.setTooltipData null&#125;&#125; as |chart|
          /&gt; &#123;&#123;#if this.tooltipData&#125;&#125; &lt;chart.tooltip
          @title=&#123;&#123;concat this.tooltipData.label " ("
          this.tooltipData.data ")" &#125;&#125; &gt;
          &#123;&#123;this.chartData.ipsum&#125;&#125; &lt;/chart.tooltip&gt;
          &#123;&#123;/if&#125;&#125; &lt;/div&gt;
        </:html>
        <:css>
          .medium-example { height: 250px; width: 250px; }
        </:css>
        <:data>{{this.sampleData}}</:data>
      </SampleCode>
    </div>
  </template>
}
