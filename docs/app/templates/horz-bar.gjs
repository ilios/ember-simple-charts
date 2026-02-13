import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example';
import IconExample from '../components/icon-example';
import ResponsiveExample from '../components/responsive-example';
import TooltipExample from '../components/tooltip-example';
import ClickExample from '../components/click-example';
<template>
  {{pageTitle "Horizonal Bar"}}
  <div class="chart">
    <h2>Horizonal Bar Chart</h2>
    <Example @name="horz-bar" />
    <IconExample @name="horz-bar" />
    <ResponsiveExample @name="horz-bar" />
    <TooltipExample @name="horz-bar" />
    <ClickExample @name="horz-bar" />
  </div>
</template>
