import EmberObject from '@ember/object';

let donut = [];
for (let i = 100; i < 1000; i += 50) {
  donut.push({
    label: i,
    data: i
  })
}
donut = donut
  .map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);
const pie = [
  {
    label: 'Totally Cool',
    data: 300
  },
  {
    label: 'Way Cool',
    data: 200
  },
  {
    label: 'Cucumber Cool',
    data: 400
  },
  {
    label: 'So Cool',
    data: 500
  },
];
const bar = [
  {
    label: '300',
    data: 300
  },
  {
    label: '200',
    data: 200
  },
  {
    label: '400',
    data: 400
  },
  {
    label: 'Long Label',
    data: 500
  },
];
const horz = [
  {
    label: 'Mark',
    data: 150
  },
  {
    label: 'John',
    data: 200
  },
  {
    label: 'Kathy',
    data: 300
  },
  {
    label: 'Jeff Long Namerson',
    data: 350
  },
  {
    label: 'Joe',
    data: 100
  },
  {
    label: 'Kelly',
    data: 200
  },
  {
    label: 'Jason',
    data: 350
  }
];
const cluster = {
  name: 'Root',
  children: [
    {
      name: 'first one',
      children: [
        {
          name: 'first two one',
          children: [

          ]
        },
        {
          name: 'first two two',
          children: [

          ]
        },
        {
          name: 'first two three',
          children: [

          ]
        }
      ]
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
                  children: [

                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const ipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget nunc cursus,
  efficitur tortor in, varius lacus. Praesent odio tellus, sollicitudin tincidunt luctus sit amet, dignissim nec risus.
  Aenean pharetra laoreet blandit. Suspendisse consectetur justo eu elit vestibulum, a suscipit ante lacinia.
  Nulla dapibus massa tortor, non fermentum nisl efficitur commodo. Mauris pretium odio et lobortis viverra.
  Nullam consequat tortor ut leo bibendum viverra. Pellentesque purus arcu, pretium non consectetur in,
  tempus vel eros. Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  Donec eget fringilla felis. Proin sit amet nisi turpis.`;

export default EmberObject.create({ donut, pie, bar, horz, ipsum, cluster });
