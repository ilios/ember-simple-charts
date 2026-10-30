import { pageTitle } from 'ember-page-title';
import Example from '../components/example.gjs';
import IconExample from '../components/icon-example.gjs';
import ResponsiveExample from '../components/responsive-example.gjs';
import TooltipExample from '../components/tooltip-example.gjs';
import ClickExample from '../components/click-example.gjs';

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
