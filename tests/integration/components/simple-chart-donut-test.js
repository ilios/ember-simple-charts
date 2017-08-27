import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';

moduleForComponent('simple-chart-donut', 'Integration | Component | simple chart donut', {
  integration: true
});

test('it renders', function (assert) {
  this.set('chartData', ChartData);
  const svg = 'svg';
  this.render(hbs`{{simple-chart-donut data=chartData.donut}}`);

  assert.equal(this.$(svg).attr('height'), '100%');
  assert.equal(this.$(svg).attr('width'), '100%');
});
