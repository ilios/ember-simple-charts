import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example';
import IconExample from '../components/icon-example';
import ResponsiveExample from '../components/responsive-example';
import TooltipExample from '../components/tooltip-example';
import ClickExample from '../components/click-example';
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
