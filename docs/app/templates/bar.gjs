import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example.js';
import IconExample from '../components/icon-example.js';
import ResponsiveExample from '../components/responsive-example.js';
import TooltipExample from '../components/tooltip-example.js';
import ClickExample from '../components/click-example.js';
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
