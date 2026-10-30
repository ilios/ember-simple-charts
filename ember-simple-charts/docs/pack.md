# Pack Chart

Use `@name="pack"` to render a pack chart.

## Data

Pass a root node with nested children to `@data`:

- `label`: the node label.
- `value`: the node's numeric contribution to the pack layout. Pack uses `value`,
  not `data`, and sums each node's value with its descendants' values.
- `description`: optional descriptive text included in the non-icon chart.
- `children`: an array of child nodes with the same shape; use `[]` for a leaf.

Nodes that only group children can omit `value`. Values on internal nodes are
included in the sum as well as values on leaves.

## Usage

```gjs
import SimpleChart from 'ember-simple-charts/components/simple-chart';

const data = {
  label: 'Root',
  description: 'this is the root.',
  children: [
    {
      label: 'first one',
      description: 'this is the first one.',
      children: [
        {
          label: 'first two one',
          description: 'this is the first two one.',
          value: 8,
          children: [],
        },
        {
          label: 'first two two',
          description: 'this is the first two two.',
          value: 1,
          children: [],
        },
        {
          label: 'first two three',
          description: 'this is the first two three.',
          value: 2,
          children: [],
        },
      ],
    },
    {
      label: 'second one',
      description: 'this is the second one.',
      children: [
        {
          label: 'second two one',
          description: 'this is the second two one.',
          value: 30,
          children: [
            {
              label: 'second three one',
              description: 'this is the second three one.',
              value: 20,
              children: [
                {
                  label: 'second four one',
                  description: 'this is the second four one.',
                  value: 10,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'third one',
      description: 'this is the third one.',
      value: 133,
      children: [],
    },
    {
      label: 'fourth one',
      description: 'this is the fourth one.',
      children: [
        {
          label: 'fourth two one',
          description: 'this is the fourth two one.',
          value: 20,
          children: [],
        },
        {
          label: 'fourth two two',
          description: 'this is the fourth two two.',
          value: 13,
          children: [],
        },
      ],
    },
  ],
};

<template>
  <SimpleChart @name="pack" @data={{data}} />
</template>
```

## Icon and Responsive Usage

Add `@isIcon={{true}}` for an icon without descriptions or interactions. The chart
automatically responds to changes in its container size.

## Tooltips and Click Handling

Pass `@hover` and `@leave` handlers to track the hovered node, and use the
yielded `chart.tooltip` to display a tooltip. Pass `@onClick` to handle the clicked
node; handlers can be asynchronous. Handlers receive the original node, including
its `value` when present, not the layout's computed sum.

For more information, see `simple-chart-pack-test.gjs` and
`simple-chart-tooltip-test.gjs` in `tests/integration/components/`.
