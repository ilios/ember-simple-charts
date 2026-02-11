import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example.js';
import IconExample from '../components/icon-example.js';
import ResponsiveExample from '../components/responsive-example.js';
import TooltipExample from '../components/tooltip-example.js';
import ClickExample from '../components/click-example.js';
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
