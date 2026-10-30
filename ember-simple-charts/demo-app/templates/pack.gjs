import { pageTitle } from 'ember-page-title';
import Example from '../components/example.gjs';
import IconExample from '../components/icon-example.gjs';
import ResponsiveExample from '../components/responsive-example.gjs';
import TooltipExample from '../components/tooltip-example.gjs';
import ClickExample from '../components/click-example.gjs';

<template>
  {{pageTitle "Pack"}}
  <div class="chart">
    <h2>Pack Chart</h2>
    <Example @name="pack" />
    <IconExample @name="pack" />
    <ResponsiveExample @name="pack" />
    <TooltipExample @name="pack" />
    <ClickExample @name="pack" />
  </div>
</template>
