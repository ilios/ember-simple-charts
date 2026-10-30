import { pageTitle } from 'ember-page-title';
import SimpleChart from '#src/components/simple-chart';
import { get, fn, concat } from '@ember/helper';
import demo from '../lib/demo.js';

<template>
  {{pageTitle "TestApp"}}

  <h1>Examples</h1>
  <div class="examples">
    {{#each demo.charts as |c|}}
      <div class="example">
        <h2>
          <SimpleChart
            @isIcon={{true}}
            @name={{c.name}}
            @data={{get demo.chartData c.data}}
          />
          {{c.title}}
        </h2>
        <SimpleChart
          class="normal"
          @name={{c.name}}
          @data={{get demo.chartData c.data}}
          @hover={{demo.setToolTipData}}
          @leave={{fn demo.setToolTipData null}}
          @onClick={{c.clickHandler}}
          as |chart|
        >
          {{#if demo.tooltipData}}
            <chart.tooltip
              @title={{concat
                demo.tooltipData.label
                " ("
                demo.tooltipData.data
                ")"
              }}
            >
              {{demo.chartData.ipsum}}
            </chart.tooltip>
          {{/if}}
        </SimpleChart>

      </div>
    {{/each}}

    <div class="example box-chart">
      <h2>
        <SimpleChart
          @isIcon={{true}}
          @name="box"
          @data={{get demo.chartData "box"}}
        />
        <SimpleChart
          @isIcon={{true}}
          @name="bar"
          @data={{get demo.chartData "bar"}}
        />
        Box that matches data color
      </h2>
      <SimpleChart
        class="normal"
        @name="box"
        @data={{get demo.chartData "box"}}
        @hover={{demo.setToolTipData}}
        @leave={{fn demo.setToolTipData null}}
        as |chart|
      >
        {{#if demo.tooltipData}}
          <chart.tooltip
            @title={{concat
              demo.tooltipData.label
              " ("
              demo.tooltipData.data
              ")"
            }}
          >
            {{demo.chartData.ipsum}}
          </chart.tooltip>
        {{/if}}
      </SimpleChart>
    </div>
  </div>
</template>
