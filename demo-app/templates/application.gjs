import { LinkTo } from '@ember/routing';

<template>
  <nav aria-label="Chart examples">
    <LinkTo @route="index">Overview</LinkTo>
    <LinkTo @route="donut">Donut</LinkTo>
    <LinkTo @route="pie">Pie</LinkTo>
    <LinkTo @route="bar">Bar</LinkTo>
    <LinkTo @route="horz-bar">Horizontal Bar</LinkTo>
    <LinkTo @route="cluster">Cluster</LinkTo>
    <LinkTo @route="pack">Pack</LinkTo>
    <LinkTo @route="tree">Tree</LinkTo>
    <LinkTo @route="box">Box</LinkTo>
  </nav>

  {{outlet}}
</template>
