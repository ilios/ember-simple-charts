import { pageTitle } from 'ember-page-title';
import Example from '../components/example.gjs';
import IconExample from '../components/icon-example.gjs';
import ResponsiveExample from '../components/responsive-example.gjs';
import TooltipExample from '../components/tooltip-example.gjs';
import ClickExample from '../components/click-example.gjs';

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
