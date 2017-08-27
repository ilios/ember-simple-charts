import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';

moduleForComponent('simple-chart-horz-bar', 'Integration | Component | simple chart horz bar', {
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
  const rect5 = `${shapes}:eq(4)`;
  const rect6 = `${shapes}:eq(5)`;
  const rect7 = `${shapes}:eq(6)`;

  this.render(hbs`{{simple-chart-horz-bar data=chartData.horz}}`);
  percySnapshot(assert);

  assert.equal(this.$(svg).attr('height'), '100%');
  assert.equal(this.$(svg).attr('width'), '100%');
  assert.equal(this.$(shapes).length, 7);
  assert.equal(this.$(rect1).attr('width'), '40.714285714285715%');
  assert.equal(this.$(rect2).attr('width'), '54.285714285714285%');
  assert.equal(this.$(rect3).attr('width'), '81.42857142857143%');
  assert.equal(this.$(rect4).attr('width'), '95%');
  assert.equal(this.$(rect5).attr('width'), '27.142857142857142%');
  assert.equal(this.$(rect6).attr('width'), '54.285714285714285%');
  assert.equal(this.$(rect7).attr('width'), '95%');

});
