import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example';
import IconExample from '../components/icon-example';
import ResponsiveExample from '../components/responsive-example';
import TooltipExample from '../components/tooltip-example';
import ClickExample from '../components/click-example';
<template>
  {{pageTitle "Donut"}}
  <div class="chart">
    <h2>Donut Chart</h2>
    <Example @name="donut" />
    <IconExample @name="donut" />
    <ResponsiveExample @name="donut" />
    <TooltipExample @name="donut" />
    <ClickExample @name="donut" />
  </div>
</template>
