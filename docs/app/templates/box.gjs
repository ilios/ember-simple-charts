import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example.js';
import IconExample from '../components/icon-example.js';
import ResponsiveExample from '../components/responsive-example.js';
import TooltipExample from '../components/tooltip-example.js';
import ClickExample from '../components/click-example.js';
<template>
  {{pageTitle "Bar"}}
  <div class="chart">
    <h2>Box Chart</h2>
    <Example @name="box" />
    <IconExample @name="box" />
    <ResponsiveExample @name="box" />
    <TooltipExample @name="box" />
    <ClickExample @name="box" />
  </div>
</template>
