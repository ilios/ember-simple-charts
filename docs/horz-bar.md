# Horizontal Bar Chart

Use `@name="horz-bar"` to render a horizontal bar chart.

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
    label: 'Mark',
    data: 150,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    meta: { id: 10 },
  },
  {
    label: 'John',
    data: 200,
    description:
      'Nam elit metus, interdum nec augue vitae, molestie interdum dui.',
    meta: { id: 20 },
  },
  {
    label: 'Kathy',
    data: 300,
    description: 'Sed rutrum ut libero feugiat ultricies.',
    meta: { id: 30 },
  },
  {
    label: 'Jeff Long Namerson',
    data: 350,
    description: 'Integer tempor tortor eu ipsum efficitur ultricies.',
    meta: { id: 40 },
  },
  {
    label: 'Joe',
    data: 100,
    description:
      'Etiam aliquam lectus ipsum, ullamcorper accumsan quam facilisis non.',
    meta: { id: 10 },
  },
  {
    label: 'Kelly',
    data: 200,
    description: 'Pellentesque id facilisis velit, et elementum augue.',
    meta: { id: 20 },
  },
  {
    label: 'Jason',
    data: 350,
    description: 'Integer rutrum odio nec eros cursus ullamcorper id ut magna.',
    meta: { id: 30 },
  },
];

<template>
  <SimpleChart @name="horz-bar" @data={{data}} />
</template>
```

## Icon and Responsive Usage

Add `@isIcon={{true}}` for an icon without labels or interactions. The chart
automatically responds to changes in its container size.

## Tooltips and Click Handling

Pass `@hover` and `@leave` handlers to track the hovered record, and use the
yielded `chart.tooltip` to display a tooltip. Pass `@onClick` to handle the clicked
record; handlers can be asynchronous.

For more information, see `simple-chart-horz-bar-test.gjs` and
`simple-chart-tooltip-test.gjs` in `tests/integration/components/`.
