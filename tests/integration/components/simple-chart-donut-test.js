import { later } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ChartData from 'dummy/lib/chart-data';
import { percySnapshot } from 'ember-percy';
import wait from 'ember-test-helpers/wait';

moduleForComponent('simple-chart-donut', 'Integration | Component | simple chart donut', {
  integration: true
});

test('it renders', async function (assert) {
  this.set('chartData', ChartData);
  const svg = 'svg';
  this.render(hbs`{{simple-chart-donut data=chartData.donut}}`);
  later(() => {
    percySnapshot(assert);
    assert.equal(this.$(svg).attr('height'), '100%');
    assert.equal(this.$(svg).attr('width'), '100%');
  }, 1000);

  await wait();
});
