import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { action } from '@ember/object';

import { select } from 'd3-selection';
import { scaleBand, scaleLinear, scaleSequential } from 'd3-scale';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { A } from '@ember/array';

export default class SimpleChartDonut extends Component {
  @tracked loading;

  @action
  draw(element, [elementHeight, elementWidth, data]) {
    if (!elementHeight || !elementWidth) {
      return;
    }
    const dataOrArray = data ? data : [{ data: 1, label: '', empty: true }];
    const svg = select(element);
    const values = A(dataOrArray).mapBy('data');
    const color = scaleSequential(interpolateSinebow).domain([
      0,
      Math.max(...values),
    ]);

    const yScale = scaleLinear()
      .domain([0, Math.max(...dataOrArray.map((d) => d.data))])
      .range([0, this.args.isIcon ? 100 : 95]);

    const xScale = scaleBand()
      .domain(dataOrArray.map((d) => d.label))
      .range([0, this.args.isIcon ? 100 : 95])
      .paddingInner(0.12);

    svg.selectAll('.bars').remove();
    const bars = svg.append('g').attr('class', 'bars');

    const rect = bars
      .selectAll('rect')
      .data(dataOrArray)
      .enter()
      .append('rect')
      .attr('width', `${xScale.bandwidth()}%`)
      .attr('height', (d) => `${yScale(d.data)}%`)
      .attr('x', (d) => `${xScale(d.label)}%`)
      .attr('y', (d) => `${100 - yScale(d.data)}%`)
      .attr('fill', (d) => color(d.data));

    if (!this.args.isIcon) {
      const text = bars
        .selectAll('text')
        .data(dataOrArray)
        .enter()
        .append('text')
        .style('color', (d) => {
          const rgb = color(d.data);
          //cut up rgb(1, 99, 245) into parts
          const parts = rgb.substr(4).split(')')[0].split(',');
          const r = parseInt(parts[0], 16);
          const g = parseInt(parts[1], 16);
          const b = parseInt(parts[2], 16);
          //Thanks to https://24ways.org/2010/calculating-color-contrast for this formula
          const yiq = (r * 299 + g * 587 + b * 114) / 1000;

          return yiq >= 256 ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
        })
        .style('font-size', '.8rem')
        .attr('text-anchor', 'middle')
        .attr('x', (d) => `${xScale(d.label) + xScale.bandwidth() / 2}%`)
        .attr('y', (d) => `${110 - yScale(d.data)}%`)
        .text((d) => d.data);

      const handleHover = ({ target }) => {
        const { data } = select(target).datum();
        const rects = svg.selectAll('rect');
        const selected = rects.filter(
          (rectData) => rectData.label === data.label
        );
        this.args.hover(data, selected.node());
      };
      rect.on('mouseenter', handleHover);
      text.on('mouseenter', handleHover);
      rect.on('mouseleave', this.args.leave);
      text.on('mouseleave', this.args.leave);

      if (this.args.isClickable) {
        rect.on('click', ({ target }) => {
          const { data } = select(target).datum();
          this.args.onClick(data);
        });
        rect.style('cursor', 'pointer');
        text.on('click', ({ target }) => {
          const { data } = select(target).datum();
          this.args.onClick(data);
        });
        text.style('cursor', 'pointer');
      }
    }
  }
}
