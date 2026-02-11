import pageTitle from 'ember-page-title/helpers/page-title';
import Example from '../components/example';
import IconExample from '../components/icon-example';
import ResponsiveExample from '../components/responsive-example';
import TooltipExample from '../components/tooltip-example';
import ClickExample from '../components/click-example';
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
