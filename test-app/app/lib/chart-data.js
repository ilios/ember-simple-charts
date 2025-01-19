const donut = [
  {
    label: 'Totally Cool',
    data: 300,
    description: 'This is totally cool.',
    meta: { id: 10 },
    textForeground: 'rgb(62, 0, 0)',
    textBackground: 'rgba(209, 209, 209, 0.75)',
  },
  {
    label: 'Way Cool',
    data: 200,
    description: 'This is way cool.',
    meta: { id: 20 },
    textForeground: 'rgb(227, 189, 189)',
    textBackground: 'rgb(150, 77, 0)',
  },
  {
    label: 'Cucumber Cool',
    data: 400,
    description: 'This is cool as cucumber.',
    meta: { id: 30 },
    textBackground: 'rgb(201, 255, 201)',
  },
  {
    label: 'So Cool',
    data: 500,
    description: 'This is so cool.',
    meta: { id: 40 },
    textForeground: 'rgb(164, 216, 255)',
  },
  {
    label: 'Mega Cool',
    data: 200,
    description: 'Incredibly mega cool.',
    meta: { id: 50 },
  },
];
const pie = [
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
const bar = [
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
const horzBar = [
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
const cluster = {
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
const pack = {
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
const tree = {
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

const box = {
  allData: bar,
  boxData: bar[1],
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
  horzBar,
  ipsum,
  cluster,
  pack,
  tree,
  box,
  click,
};
