# Bar Chart

Use `@name="bar"` to render a bar chart.

## Data

Pass an array of records to `@data`:

- `label`: the bar label.
- `data`: the numeric value used to size and color the bar.
- `description`: optional descriptive text included in the non-icon chart.
- `meta`: optional application metadata passed to interaction handlers.

## Usage

```gjs
import SimpleChart from 'ember-simple-charts/components/simple-chart';

const data = [
  {
    label: '300',
    data: 300,
    description: 'The value is 300.',
    meta: { id: 10 },
  },
  {
    label: '200',
    data: 200,
    description: '200 points.',
    meta: { id: 20 },
  },
  {
    label: '400',
    data: 400,
    description: 'Four hundred.',
    meta: { id: 30 },
  },
  {
    label: 'Long Label',
    data: 500,
    description: 'Even longer description.',
    meta: { id: 40 },
  },
];

<template>
  <SimpleChart @name="bar" @data={{data}} />
</template>
```

## Icon and Responsive Usage

Add `@isIcon={{true}}` for an icon without labels or interactions. The chart
automatically responds to changes in its container size.

## Tooltips and Click Handling

Pass `@hover` and `@leave` handlers to track the hovered record, and use the
yielded `chart.tooltip` to display a tooltip. Pass `@onClick` to handle the clicked
record; handlers can be asynchronous.

For more information, see `simple-chart-bar-test.gjs` and
`simple-chart-tooltip-test.gjs` in `tests/integration/components/`.
