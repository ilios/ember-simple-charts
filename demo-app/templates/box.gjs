import { pageTitle } from 'ember-page-title';
import Example from '../components/example.gjs';
import IconExample from '../components/icon-example.gjs';
import ResponsiveExample from '../components/responsive-example.gjs';
import TooltipExample from '../components/tooltip-example.gjs';
import ClickExample from '../components/click-example.gjs';

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
