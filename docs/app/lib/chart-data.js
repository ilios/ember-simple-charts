// BEGIN-SNIPPET chart-data.js
const donut = [
  {
    label: 'Totally Cool',
    data: 300,
  },
  {
    label: 'Way Cool',
    data: 200,
  },
  {
    label: 'Cucumber Cool',
    data: 400,
  },
  {
    label: 'So Cool',
    data: 500,
  },
];
const pie = [
  {
    label: 'Totally Cool',
    data: 300,
  },
  {
    label: 'Way Cool',
    data: 200,
  },
  {
    label: 'Cucumber Cool',
    data: 400,
  },
  {
    label: 'So Cool',
    data: 500,
  },
];
const bar = [
  {
    label: '300',
    data: 300,
  },
  {
    label: '200',
    data: 200,
  },
  {
    label: '400',
    data: 400,
  },
  {
    label: 'Long Label',
    data: 500,
  },
];
const horz = [
  {
    label: 'Mark',
    data: 150,
  },
  {
    label: 'John',
    data: 200,
  },
  {
    label: 'Kathy',
    data: 300,
  },
  {
    label: 'Jeff Long Namerson',
    data: 350,
  },
  {
    label: 'Joe',
    data: 100,
  },
  {
    label: 'Kelly',
    data: 200,
  },
  {
    label: 'Jason',
    data: 350,
  },
];
const cluster = {
  name: 'Root',
  children: [
    {
      name: 'first one',
      children: [
        {
          name: 'first two one',
          children: [],
        },
        {
          name: 'first two two',
          children: [],
        },
        {
          name: 'first two three',
          children: [],
        },
      ],
    },
    {
      name: 'second one',
      children: [
        {
          name: 'second two one',
          children: [
            {
              name: 'second three one',
              children: [
                {
                  name: 'second four one',
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
const pack = {
  label: 'Root',
  children: [
    {
      label: 'first one',
      children: [
        {
          label: 'first two one',
          value: 8,
          children: [],
        },
        {
          label: 'first two two',
          value: 1,
          children: [],
        },
        {
          label: 'first two three',
          value: 2,
          children: [],
        },
      ],
    },
    {
      label: 'second one',
      children: [
        {
          label: 'second two one',
          value: 30,
          children: [
            {
              label: 'second three one',
              value: 20,
              children: [
                {
                  label: 'second four one',
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
      value: 133,
      children: [],
    },
    {
      label: 'fourth one',
      children: [
        {
          label: 'fourth two one',
          value: 20,
          children: [],
        },
        {
          label: 'fourth two two',
          value: 13,
          children: [],
        },
      ],
    },
  ],
};
const tree = {
  label: 'Root',
  children: [
    {
      label: 'first one',
      children: [
        {
          label: 'first two one',
          value: 8,
          children: [],
        },
        {
          label: 'first two two',
          value: 1,
          children: [],
        },
        {
          label: 'first two three',
          value: 2,
          children: [],
        },
      ],
    },
    {
      label: 'second one',
      children: [
        {
          label: 'second two one',
          value: 30,
          children: [
            {
              label: 'second three one',
              value: 20,
              children: [
                {
                  label: 'second four one',
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
      value: 133,
      children: [],
    },
    {
      label: 'fourth one',
      children: [
        {
          label: 'fourth two one',
          value: 20,
          children: [],
        },
        {
          label: 'fourth two two',
          value: 13,
          children: [],
        },
      ],
    },
  ],
};

const click = function (data) {
  alert(data.label || data.name);
};

const ipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget nunc cursus,
  efficitur tortor in, varius lacus. Praesent odio tellus, sollicitudin tincidunt luctus sit amet, dignissim nec risus.
  Aenean pharetra laoreet blandit. Suspendisse consectetur justo eu elit vestibulum, a suscipit ante lacinia.
  Nulla dapibus massa tortor, non fermentum nisl efficitur commodo. Mauris pretium odio et lobortis viverra.
  Nullam consequat tortor ut leo bibendum viverra. Pellentesque purus arcu, pretium non consectetur in,
  tempus vel eros. Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  Donec eget fringilla felis. Proin sit amet nisi turpis.`;

export default {
  donut,
  pie,
  bar,
  horz,
  ipsum,
  cluster,
  pack,
  tree,
  click,
};
// END-SNIPPET
