import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example.js';
import IconExample from '../components/icon-example.js';
import ResponsiveExample from '../components/responsive-example.js';
import TooltipExample from '../components/tooltip-example.js';
import ClickExample from '../components/click-example.js';
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
