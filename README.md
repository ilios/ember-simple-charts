# ember-simple-charts

![Continuous Integration](https://github.com/ilios/ember-simple-charts/workflows/Continuous%20Integration/badge.svg)


Simple charts for ember apps

## Compatibility

- Ember.js v6.4 or above
- Embroider or ember-auto-import v2
- Node.js v24 or above

## Installation

```shell
ember install ember-simple-charts
```

## Usage

Data Provider

```javascript
import Controller from '@ember/controller';

export default class ChartController extends Controller {
  donutData = [
    {
      label: 'Super Cool',
      data: 100,
      description: 'Lorem Ipsum',
    },
    {
      label: 'Very Cool',
      data: 200,
      description: 'Long text description here.',
    },
  ];
}
```

Template:

```handlebars
<SimpleChart @name='donut' @data={{this.donutData}} />
```

For live examples, run `pnpm start` from the
repository root to open the [demo application](demo-app/).

Chart guides:

- [Donut](docs/donut.md)
- [Pie](docs/pie.md)
- [Bar](docs/bar.md)
- [Horizontal Bar](docs/horz-bar.md)
- [Cluster](docs/cluster.md)
- [Pack](docs/pack.md)
- [Tree](docs/tree.md)
- [Box](docs/box.md)

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
