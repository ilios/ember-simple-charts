import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { select } from 'd3-selection';
import { scaleSequential } from 'd3-scale';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { modifier } from 'ember-modifier';

export default class SimpleChartBox extends Component {
  @tracked loading = true;

  paint = modifier(
    (element, [data, isIcon, isClickable, hover, leave, onClick]) => {
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
  <template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="simple-chart-box{{if this.loading ' loading' ' loaded'}}"
      height={{@containerHeight}}
      width={{@containerWidth}}
      {{this.paint @data @isIcon @isClickable @hover @leave @onClick}}
      ...attributes
    ></svg>
  </template>
}
