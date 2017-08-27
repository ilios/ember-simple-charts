import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ChartData from '../../../tests/chart-data';

moduleForComponent('simple-chart-bar', 'Integration | Component | simple chart bar', {
  integration: true
});

test('it renders', function (assert) {
  this.set('chartData', ChartData);
  const svg = 'svg';
  const shapes = `${svg} .bars rect`;
  const rect1 = `${shapes}:eq(0)`;
  const rect2 = `${shapes}:eq(1)`;
  const rect3 = `${shapes}:eq(2)`;
  const rect4 = `${shapes}:eq(3)`;

  this.render(hbs`{{simple-chart-bar data=chartData.bar}}`);

  assert.equal(this.$(svg).attr('height'), '100%');
  assert.equal(this.$(svg).attr('width'), '100%');
  assert.equal(this.$(shapes).length, 4);
  assert.equal(this.$(rect1).attr('y'), '43%');
  assert.equal(this.$(rect2).attr('y'), '62%');
  assert.equal(this.$(rect3).attr('y'), '24%');
  assert.equal(this.$(rect4).attr('y'), '5%');
});
