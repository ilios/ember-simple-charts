ember-simple-charts
==============================================================================

Simple charts for ember apps


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.13 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

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

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
