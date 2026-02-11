import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example';
import IconExample from '../components/icon-example';
import ResponsiveExample from '../components/responsive-example';
import TooltipExample from '../components/tooltip-example';
import ClickExample from '../components/click-example';
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
