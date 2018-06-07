import Component from '@ember/component';
import { get } from '@ember/object';
import ChartProperties from 'ember-simple-charts/mixins/chart-properties';

import { select } from 'd3-selection';
import {
  scaleBand,
  scaleLinear,
  scaleSequential
} from 'd3-scale';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { A } from '@ember/array';

export default Component.extend(ChartProperties, {
  classNames: ['simple-chart-horz-bar'],
  draw(){
    const data = get(this, 'data');
    const isIcon = get(this, 'isIcon');
    const hover = get(this, 'hover');
    const leave = get(this, 'leave');
    const click = get(this, 'click');
    const isClickable = get(this, 'isClickable');
    const dataOrArray = data?data:[{data: 1, label: '', empty: true}];
    const svg = select(this.element);
    const values = A(dataOrArray).mapBy('data');
    const color = scaleSequential(interpolateSinebow).domain([0, Math.max(...values)]);

    const xScale = scaleLinear()
    .domain([0, Math.max(...dataOrArray.map(d => d.data))])
    .range([0, isIcon?100:95]);

    const yScale = scaleBand()
      .domain(dataOrArray.map(d => d.label))
      .range([0, isIcon?100:95])
      .paddingInner(0.12);

    svg.selectAll('.bars').remove();
    const bars = svg.append('g').attr('class', 'bars');

    const rect = bars.selectAll('rect').data(dataOrArray).enter()
      .append('rect')
      .attr('height', `${yScale.bandwidth()}%`)
      .attr('width', d => `${xScale(d.data)}%`)
      .attr('y', d => `${yScale(d.label)}%`)
      .attr('x', 0)
      .attr('fill', d =>  color(d.data));

      if (!isIcon) {
        const text = bars.selectAll('text').data(dataOrArray).enter()
          .append("text")
          .attr("fill", "#ffffff")
          .style("font-size", ".8rem")
          .attr("text-anchor", "end")
          .attr("text-align", "right")
          .attr("alignment-baseline", "central")
          .attr('y', d => `${yScale(d.label) + (yScale.bandwidth() / 2)}%`)
          .attr('x', d => `${xScale(d.data) - 3}%`)
          .text(d => d.label);

        const handleHover = data => {
          const rects = svg.selectAll('rect');
          const selected = rects.filter(rectData => rectData.label === data.label);
          hover(data, selected.node());
        }
        rect.on('mouseenter', handleHover);
        text.on('mouseenter', handleHover);
        rect.on('mouseleave', leave);
        text.on('mouseleave', leave);

        if (isClickable) {
          rect.on('click', data => {
            click(data);
          });
          rect.style("cursor", "pointer");
          text.on('click', data => {
            click(data);
          });
          text.style("cursor", "pointer");
        }
      }
  },
});
