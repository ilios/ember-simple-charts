import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example';
import IconExample from '../components/icon-example';
import ResponsiveExample from '../components/responsive-example';
import TooltipExample from '../components/tooltip-example';
import ClickExample from '../components/click-example';
<template>
  {{pageTitle "Cluster"}}
  <div class="chart">
    <h2>Cluster Chart</h2>
    <Example @name="cluster" />
    <IconExample @name="cluster" />
    <ResponsiveExample @name="cluster" />
    <TooltipExample @name="cluster" />
    <ClickExample @name="cluster" />
  </div>
</template>
