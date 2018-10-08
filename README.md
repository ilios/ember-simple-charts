ember-simple-charts [![Greenkeeper badge](https://badges.greenkeeper.io/ilios/ember-simple-charts.svg)](https://greenkeeper.io/)
==============================================================================

Simple charts for ember apps

Installation
------------------------------------------------------------------------------

* `git clone <repository-url>` this repository
* `cd ember-simple-charts`
```
ember install ember-simple-charts
```


Usage
------------------------------------------------------------------------------

Data Provider
```javascript
import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  donutData: [
    {
      label: 'Super Cool',
      data: 100
    },
    {
      label: 'Very Cool',
      data: 200
    },
  ],
});
```

Template:
```handlebars
  {{simple-chart height=250 width=250 name='donut' data=donutData}}
```

More examples can be found in this addons dummy application.

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-simple-charts`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
