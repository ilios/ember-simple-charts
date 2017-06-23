# ember-simple-charts

Simple charts for ember apps:

## Example

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

## Installation

* `git clone <repository-url>` this repository
* `cd ember-simple-charts`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
