import { pageTitle } from 'ember-page-title';
import Example from '../components/example.gjs';
import IconExample from '../components/icon-example.gjs';
import ResponsiveExample from '../components/responsive-example.gjs';
import TooltipExample from '../components/tooltip-example.gjs';
import ClickExample from '../components/click-example.gjs';

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
