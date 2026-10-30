import { pageTitle } from 'ember-page-title';
import Example from '../components/example.gjs';
import IconExample from '../components/icon-example.gjs';
import ResponsiveExample from '../components/responsive-example.gjs';
import TooltipExample from '../components/tooltip-example.gjs';
import ClickExample from '../components/click-example.gjs';

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
