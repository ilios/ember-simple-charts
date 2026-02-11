import { LinkTo } from '@ember/routing';
import SimpleChart from 'ember-simple-charts/components/simple-chart';
<template>
  <div class="wrapper">
    <div class="panel">
      <h2>
        <LinkTo @route="donut">
          Donut
        </LinkTo>
      </h2>
      <SimpleChart @name="donut" @data={{@model.donut}} />
    </div>
    <div class="panel">
      <h2>
        <LinkTo @route="pie">
          Pie
        </LinkTo>
      </h2>
      <SimpleChart @name="pie" @data={{@model.pie}} />
    </div>
    <div class="panel">
      <h2>
        <LinkTo @route="bar">
          Bar
        </LinkTo>
      </h2>
      <SimpleChart @name="bar" @data={{@model.bar}} />
    </div>
    <div class="panel">
      <h2>
        <LinkTo @route="horz-bar">
          Horizontal Bar
        </LinkTo>
      </h2>
      <SimpleChart @name="horz-bar" @data={{@model.bar}} />
    </div>
    <div class="panel">
      <h2>
        <LinkTo @route="cluster">
          Cluster
        </LinkTo>
      </h2>
      <SimpleChart @name="cluster" @data={{@model.cluster}} />
    </div>
    <div class="panel">
      <h2>
        <LinkTo @route="pack">
          Pack
        </LinkTo>
      </h2>
      <SimpleChart @name="pack" @data={{@model.pack}} />
    </div>
    <div class="panel">
      <h2>
        <LinkTo @route="tree">
          Tree
        </LinkTo>
      </h2>
      <SimpleChart @name="tree" @data={{@model.tree}} />
    </div>
    <div class="panel">
      <h2>
        <LinkTo @route="box">
          Box
        </LinkTo>
      </h2>
      <SimpleChart @name="box" @data={{@model.box}} />
    </div>
  </div>
</template>
