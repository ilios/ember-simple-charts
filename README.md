ember-simple-charts [![Greenkeeper badge](https://badges.greenkeeper.io/ilios/ember-simple-charts.svg)](https://greenkeeper.io/)
==============================================================================

Simple charts for ember apps

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

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
