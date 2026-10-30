# Donut Chart

Use `@name="donut"` to render a donut chart.

## Data

Pass an array of records to `@data`:

- `label`: the slice label.
- `data`: the numeric value used to size and color the slice.
- `description`: optional descriptive text included in the non-icon chart.
- `meta`: optional application metadata passed to interaction handlers.

## Usage

```gjs
import SimpleChart from 'ember-simple-charts/components/simple-chart';

const data = [
  {
    label: 'Totally Cool',
    data: 300,
    description: 'This is totally cool.',
    meta: { id: 10 },
  },
  {
    label: 'Way Cool',
    data: 200,
    description: 'This is way cool.',
    meta: { id: 20 },
  },
  {
    label: 'Cucumber Cool',
    data: 400,
    description: 'This is cool as cucumber.',
    meta: { id: 30 },
  },
  {
    label: 'So Cool',
    data: 500,
    description: 'This is so cool.',
    meta: { id: 40 },
  },
];

<template>
  <SimpleChart @name="donut" @data={{data}} />
</template>
```

## Icon and Responsive Usage

Add `@isIcon={{true}}` for an icon without labels or interactions. The chart
automatically responds to changes in its container size.

## Tooltips and Click Handling

Pass `@hover` and `@leave` handlers to track the hovered record, and use the
yielded `chart.tooltip` to display a tooltip. Pass `@onClick` to handle the clicked
record; handlers can be asynchronous.

For more information, see `simple-chart-donut-test.gjs` and
`simple-chart-tooltip-test.gjs` in `tests/integration/components/`.
