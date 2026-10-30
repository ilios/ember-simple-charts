# Tree Chart

Use `@name="tree"` to render a tree chart.

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
  description: 'Root node.',
  data: 237,
  children: [
    {
      label: 'first one',
      description: 'Lvl 1 node 1.',
      data: 11,
      children: [
        {
          label: 'first two one',
          description: 'Lvl 2 node 1.',
          data: 8,
          children: [],
        },
        {
          label: 'first two two',
          description: 'Lvl 2 node 2.',
          data: 1,
          children: [],
        },
        {
          label: 'first two three',
          description: 'Lvl 2 node 3.',
          data: 2,
          children: [],
        },
      ],
    },
    {
      label: 'second one',
      description: 'Lvl 1 node 2.',
      data: 60,
      children: [
        {
          label: 'second two one',
          description: 'Lvl 2 node 4.',
          data: 30,
          children: [
            {
              label: 'second three one',
              description: 'Lvl 3 node 1.',
              data: 20,
              children: [
                {
                  label: 'second four one',
                  description: 'Lvl 4 node 1.',
                  data: 10,
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
      description: 'Lvl 1 node 3.',
      data: 133,
      children: [],
    },
    {
      label: 'fourth one',
      description: 'Lvl 1 node 4.',
      data: 33,
      children: [
        {
          label: 'fourth two one',
          description: 'Lvl 2 node 5.',
          data: 20,
          children: [],
        },
        {
          label: 'fourth two two',
          description: 'Lvl 2 node 6.',
          data: 13,
          children: [],
        },
      ],
    },
  ],
};

<template>
  <SimpleChart @name="tree" @data={{data}} />
</template>
```

## Icon and Responsive Usage

Add `@isIcon={{true}}` for an icon without descriptions or interactions. The chart
automatically responds to changes in its container size.

## Tooltips and Click Handling

Pass `@hover` and `@leave` handlers to track the hovered node, and use the
yielded `chart.tooltip` to display a tooltip. Pass `@onClick` to handle the clicked
node; handlers can be asynchronous.

For more information, see `simple-chart-tree-test.gjs` and
`simple-chart-tooltip-test.gjs` in `tests/integration/components/`.
