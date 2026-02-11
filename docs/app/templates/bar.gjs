import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example';
import IconExample from '../components/icon-example';
import ResponsiveExample from '../components/responsive-example';
import TooltipExample from '../components/tooltip-example';
import ClickExample from '../components/click-example';
<template>
  {{pageTitle "Bar"}}
  <div class="chart">
    <h2>Bar Chart</h2>
    <Example @name="bar" />
    <IconExample @name="bar" />
    <ResponsiveExample @name="bar" />
    <TooltipExample @name="bar" />
    <ClickExample @name="bar" />
  </div>
</template>
