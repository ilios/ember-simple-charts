import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example.js';
import IconExample from '../components/icon-example.js';
import ResponsiveExample from '../components/responsive-example.js';
import TooltipExample from '../components/tooltip-example.js';
import ClickExample from '../components/click-example.js';
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
