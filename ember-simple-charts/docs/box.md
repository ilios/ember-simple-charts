# Box Chart

Use `@name="box"` to render a box chart.

## Data

Pass an object with both of these properties to `@data`:

- `allData`: the array of records used to establish the color scale. Each record
  has a numeric `data` value.
- `boxData`: the selected record to display as a box. Its `data` value determines
  the box's color using the scale from `allData`.

Records can also include `label`, `description`, and application `meta` data.
Use the same `allData` as a Donut, Pie, Bar, or Horizontal Bar chart to match the
selected record's color.

## Usage

```gjs
import SimpleChart from 'ember-simple-charts/components/simple-chart';

const allData = [
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

const data = {
  allData,
  boxData: allData[1],
};

<template>
  <SimpleChart @name="box" @data={{data}} />
</template>
```

## Icon and Responsive Usage

Add `@isIcon={{true}}` for an icon without interactions. The chart
automatically responds to changes in its container size.

## Tooltips and Click Handling

Pass `@hover` and `@leave` handlers to track the hovered record, and use the
yielded `chart.tooltip` to display a tooltip. Hover supplies the selected record's
`label`, `data`, and `meta`. Pass `@onClick` to handle the selected `boxData` record;
handlers can be asynchronous.

For more information, including color comparisons, see `simple-chart-box-test.gjs`
and `simple-chart-tooltip-test.gjs` in `tests/integration/components/`.
