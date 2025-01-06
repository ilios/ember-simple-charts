import { cached, tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { select } from 'd3-selection';
import { scaleSequential } from 'd3-scale';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { timeout, restartableTask } from 'ember-concurrency';

export default class SimpleChartBox extends Component {
  @tracked loading = true;
  @tracked element = null;

  /**
   * We use isPainted to trigger a re-render of the chart
   * Passing all the values we need to render through this getter
   * so it will re-fire if these values change
   */
  @cached
  get isPainted() {
    this.paint.perform(
      this.element,
      this.args.data,
      this.args.isIcon,
      this.args.isClickable,
      this.args.hover,
      this.args.leave,
      this.args.onClick,
    );
    return true;
  }

  paint = restartableTask(
    async (element, data, isIcon, isClickable, hover, leave, onClick) => {
      await timeout(1); //wait a beat to let the loading value settle
      this.loading = true;
      assert(
        'Box Data contains "allData"',
        Object.keys(data).includes('allData'),
      );
      assert(
        'Box Data contains "boxData"',
        Object.keys(data).includes('boxData'),
      );
      const svg = select(element);
      const values = data.allData.map((o) => o.data);
      const color = scaleSequential(interpolateSinebow).domain([
        0,
        Math.max(...values),
      ]);

      svg.selectAll('.box').remove();
      const box = svg.append('g').attr('class', 'box');

      const rect = box
        .selectAll('rect')
        .data([data.boxData])
        .enter()
        .append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', (d) => color(d.data));

      if (!isIcon) {
        const handleHover = ({ target }) => {
          const { label, data, meta } = select(target).datum();
          const rects = svg.selectAll('rect');
          const selected = rects.filter((rectData) => rectData.data === data);
          hover({ label, data, meta }, selected.node());
        };
        rect.on('mouseenter', handleHover);
        rect.on('mouseleave', leave);

        if (isClickable) {
          rect.on('click', ({ target }) => {
            const data = select(target).datum();
            onClick(data);
          });
          rect.style('cursor', 'pointer');
        }
      }
      this.loading = false;
    },
  );
}
