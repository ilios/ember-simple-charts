import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example.js';
import IconExample from '../components/icon-example.js';
import ResponsiveExample from '../components/responsive-example.js';
import TooltipExample from '../components/tooltip-example.js';
import ClickExample from '../components/click-example.js';
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
