# Cluster Chart

Use `@name="cluster"` to render a cluster chart.

## Data

Pass a root node with nested children to `@data`:

- `label`: the node label.
- `data`: the node's numeric value.
- `description`: optional descriptive text included in the non-icon chart.
- `children`: an array of child nodes with the same shape; use `[]` for a leaf.

## Usage

```gjs
import SimpleChart from 'ember-simple-charts/components/simple-chart';

const data = {
  label: 'Root',
  data: 50,
  description: 'This is the root node.',
  children: [
    {
      label: 'first one',
      data: 20,
      description: 'This node i1.',
      children: [
        {
          label: 'first two one',
          description: 'This is node i21',
          data: 10,
          children: [],
        },
        {
          label: 'first two two',
          description: 'This is node i22',
          data: 10,
          children: [],
        },
        {
          label: 'first two three',
          description: 'This is node i23',
          data: 10,
          children: [],
        },
      ],
    },
    {
      label: 'second one',
      description: 'This is node ii1',
      data: 40,
      children: [
        {
          label: 'second two one',
          description: 'This is node ii21',
          data: 30,
          children: [
            {
              label: 'second three one',
              description: 'This is node ii31',
              data: 20,
              children: [
                {
                  label: 'second four one',
                  description: 'This is node ii41',
                  data: 10,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

<template>
  <SimpleChart @name="cluster" @data={{data}} />
</template>
```

## Icon and Responsive Usage

Add `@isIcon={{true}}` for an icon without descriptions or interactions. The chart
automatically responds to changes in its container size.

## Tooltips and Click Handling

Pass `@hover` and `@leave` handlers to track the hovered node, and use the
yielded `chart.tooltip` to display a tooltip. Pass `@onClick` to handle the clicked
node; handlers can be asynchronous.

For more information, see `simple-chart-cluster-test.gjs` and
`simple-chart-tooltip-test.gjs` in `tests/integration/components/`.
