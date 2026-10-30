import { pageTitle } from 'ember-page-title';
import Example from '../components/example.gjs';
import IconExample from '../components/icon-example.gjs';
import ResponsiveExample from '../components/responsive-example.gjs';
import TooltipExample from '../components/tooltip-example.gjs';
import ClickExample from '../components/click-example.gjs';

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
