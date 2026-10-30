import { pageTitle } from 'ember-page-title';
import Example from '../components/example.gjs';
import IconExample from '../components/icon-example.gjs';
import ResponsiveExample from '../components/responsive-example.gjs';
import TooltipExample from '../components/tooltip-example.gjs';
import ClickExample from '../components/click-example.gjs';

<template>
  {{pageTitle "Tree"}}
  <div class="chart">
    <h2>Tree Chart</h2>
    <Example @name="tree" />
    <IconExample @name="tree" />
    <ResponsiveExample @name="tree" />
    <TooltipExample @name="tree" />
    <ClickExample @name="tree" />
  </div>
</template>
