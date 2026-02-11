import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example.js';
import IconExample from '../components/icon-example.js';
import ResponsiveExample from '../components/responsive-example.js';
import TooltipExample from '../components/tooltip-example.js';
import ClickExample from '../components/click-example.js';
<template>
  {{pageTitle "Cluster"}}
  <div class="chart">
    <h2>Cluster Chart</h2>
    <Example @name="cluster" />
    <IconExample @name="cluster" />
    <ResponsiveExample @name="cluster" />
    <TooltipExample @name="cluster" />
    <ClickExample @name="cluster" />
  </div>
</template>
