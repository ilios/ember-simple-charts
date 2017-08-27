import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import wait from 'ember-test-helpers/wait';

const { later } = Ember.run;

moduleForAcceptance('Acceptance | rendered charts');

test('visiting /', async function (assert) {
  await visit('/');
  const charts = '.ember-simple-charts-wrapper .panel';
  assert.equal(currentURL(), '/');
  assert.equal(find(charts).length, 4);


  //let the chart animations finish
  later(() => {
    percySnapshot(assert);
  }, 1000);
});

test('visiting donut chart', async function (assert) {
  await visit('/');
  const charts = '.ember-simple-charts-wrapper .panel';
  const link = `${charts}:eq(0) a`;

  await click(link);
  assert.equal(currentURL(), '/chart-donut');

  //let the chart animations finish
  later(() => {
    percySnapshot(assert);
  }, 1000);

  await wait();
});

test('visiting pie chart', async function (assert) {
  await visit('/');
  const charts = '.ember-simple-charts-wrapper .panel';
  const link = `${charts}:eq(1) a`;

  await click(link);
  assert.equal(currentURL(), '/chart-pie');

  //let the chart animations finish
  later(() => {
    percySnapshot(assert);
  }, 1000);

  await wait();
});

test('visiting bar chart', async function (assert) {
  await visit('/');
  const charts = '.ember-simple-charts-wrapper .panel';
  const link = `${charts}:eq(2) a`;

  await click(link);
  assert.equal(currentURL(), '/chart-bar');

  //let the chart animations finish
  later(() => {
    percySnapshot(assert);
  }, 1000);

  await wait();
});

test('visiting horz-bar chart', async function (assert) {
  await visit('/');
  const charts = '.ember-simple-charts-wrapper .panel';
  const link = `${charts}:eq(3) a`;

  await click(link);
  assert.equal(currentURL(), '/chart-horz-bar');

  //let the chart animations finish
  later(() => {
    percySnapshot(assert);
  }, 1000);

  await wait();
});
