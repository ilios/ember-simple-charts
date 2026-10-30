import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import SimpleChart from '#src/components/simple-chart';
import { fn, concat } from '@ember/helper';
import chartData from '../lib/example-data.js';

export default class TooltipExampleComponent extends Component {
  @tracked tooltipData;

  get data() {
    return chartData[this.args.name];
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
              {{chartData.ipsum}}
            </chart.tooltip>
          {{/if}}
        </SimpleChart>
      </div>
    </div>
  </template>
}
