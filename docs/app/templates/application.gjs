import pageTitle from 'ember-page-title/helpers/page-title';
import { LinkTo } from '@ember/routing';
<template>
  <div id="simple-docs">
    {{pageTitle "Ember Simple Charts Docs"}}
    <header>
      <LinkTo @route="index">
        <h1>Ember Simple Charts Documentation</h1>
      </LinkTo>
    </header>

    {{outlet}}
  </div>
</template>
