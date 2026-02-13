import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example';
import IconExample from '../components/icon-example';
import ResponsiveExample from '../components/responsive-example';
import TooltipExample from '../components/tooltip-example';
import ClickExample from '../components/click-example';
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
