import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

import { select } from 'd3-selection';
import { scaleBand, scaleLinear, scaleSequential } from 'd3-scale';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { modifier } from 'ember-modifier';
import sliceColor from '../utils/slice-color.js';

export default class SimpleChartHorzBar extends Component {
  @tracked loading = true;

  get dataOrArray() {
    return this.args.data ?? [{ data: 1, label: '', empty: true }];
  }

  paint = modifier(
    (
      element,
      [data, isIcon, isClickable, hover, leave, onClick, textIsNotOutlined],
    ) => {
      this.loading = true;
      const svg = select(element);
      const values = data.map((d) => d.data);
      const color = scaleSequential(interpolateSinebow).domain([
        0,
        Math.max(...values),
      ]);

      const xScale = scaleLinear()
        .domain([0, Math.max(...data.map((d) => d.data))])
        .range([0, isIcon ? 100 : 95]);

      const yScale = scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, isIcon ? 100 : 95])
        .paddingInner(0.12);

      svg.selectAll('.bars').remove();
      const bars = svg.append('g').attr('class', 'bars');

      const rect = bars
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('height', `${yScale.bandwidth()}%`)
        .attr('width', (d) => `${xScale(d.data)}%`)
        .attr('y', (d) => `${yScale(d.label)}%`)
        .attr('x', 0)
        .attr('fill', (d) => color(d.data));

      if (!isIcon) {
        const text = bars
          .selectAll('text')
          .data(data)
          .enter()
          .append('text')
          .style('fill', (d) => sliceColor(d.data, color))
          .style('font-size', '.8rem')
          .attr('text-anchor', 'end')
          .attr('text-align', 'right')
          .attr('alignment-baseline', 'central')
          .attr('y', (d) => `${yScale(d.label) + yScale.bandwidth() / 2}%`)
          .attr('x', (d) => `${xScale(d.data) - 3}%`)
          .each(function () {
            if (!textIsNotOutlined) {
              select(this)
                .append('tspan')
                .attr('class', 'text-outline')
                .attr('fill', (d) => sliceColor(d.data, color, true))
                .attr('stroke', (d) => sliceColor(d.data, color, true))
                .attr('stroke-width', '3px')
                .attr('stroke-linejoin', 'round')
                .attr(
                  'y',
                  (d) => `${yScale(d.label) + yScale.bandwidth() / 2}%`,
                )
                .attr('dy', '4.5')
                .text((d) => d.data)
                .append('tspan')
                .attr(
                  'y',
                  (d) => `${yScale(d.label) + yScale.bandwidth() / 2}%`,
                )
                .attr('x', (d) => `${xScale(d.data) - 3}%`)
                .attr('dy', '0')
                .text('\u200b');
            }

            select(this).append((d) => document.createTextNode(d.data));
          });

        bars
          .selectAll('rect')
          .filter((d) => d.description)
          .append('desc')
          .text((d) => d.description);

        const handleHover = ({ target }) => {
          const { label, data, meta } = select(target).datum();
          const rects = svg.selectAll('rect');
          const selected = rects.filter((rectData) => rectData.data === data);
          hover({ label, data, meta }, selected.node());
        };
        rect.on('mouseenter', handleHover);
        text.on('mouseenter', handleHover);
        rect.on('mouseleave', leave);
        text.on('mouseleave', leave);

        if (isClickable) {
          rect.on('click', ({ target }) => {
            const data = select(target).datum();
            onClick(data);
          });
          rect.style('cursor', 'pointer');
          text.on('click', ({ target }) => {
            const data = select(target).datum();
            onClick(data);
          });
          text.style('cursor', 'pointer');
        }
      }
      this.loading = false;
    },
  );
}
