import { findAll, waitUntil } from '@ember/test-helpers';

export default async function chartsLoaded() {
  //let the chart animations finish
  await waitUntil(() => {
    return findAll('.loading').length === 0;
  });
}
