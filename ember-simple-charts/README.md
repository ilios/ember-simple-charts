# ember-simple-charts

![Continuous Integration](https://github.com/ilios/ember-simple-charts/workflows/Continuous%20Integration/badge.svg)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/ilios/ember-simple-charts)
[![Netlify Status](https://api.netlify.com/api/v1/badges/59cbbb8d-bce1-4513-9377-641e2182537f/deploy-status)](https://app.netlify.com/sites/ember-simple-charts/deploys)

Simple charts for ember apps

## Compatibility

- Ember.js v6.4 or above
- Embroider or ember-auto-import v2
- Node.js v22 or above

## Installation

```shell
ember install ember-simple-charts
```

## Usage

Data Provider

```javascript
import Controller from "@ember/controller";

export default class ChartController extends Controller {
  donutData = [
    {
      label: "Super Cool",
      data: 100,
      description: "Lorem Ipsum",
    },
    {
      label: "Very Cool",
      data: 200,
      description: "Long text description here.",
    },
  ];
}
```

Template:

```handlebars
<SimpleChart @name="donut" @data={{this.donutData}} />
```

More examples can be found in this addons dummy application.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
