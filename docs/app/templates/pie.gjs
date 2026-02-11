import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example.js';
import IconExample from '../components/icon-example.js';
import ResponsiveExample from '../components/responsive-example.js';
import TooltipExample from '../components/tooltip-example.js';
import ClickExample from '../components/click-example.js';
<template>
  {{pageTitle "Pie"}}
  <div class="chart">
    <h2>Pie Chart</h2>
    <Example @name="pie" />
    <IconExample @name="pie" />
    <ResponsiveExample @name="pie" />
    <TooltipExample @name="pie" />
    <ClickExample @name="pie" />
  </div>
</template>
