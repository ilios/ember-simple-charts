import Component from '@ember/component';
import { get } from '@ember/object';
import ChartProperties from 'ember-simple-charts/mixins/chart-properties';

import { select } from 'd3-selection';
import {
  scaleOrdinal,
  scaleBand,
  scaleLinear,
  schemeCategory10
} from 'd3-scale';

export default Component.extend(ChartProperties, {
  classNames: ['simple-chart-bar'],
  draw(){
    const data = get(this, 'data');
    const isIcon = get(this, 'isIcon');
    const hover = get(this, 'hover');
    const leave = get(this, 'leave');
    const click = get(this, 'click');
    const isClickable = get(this, 'isClickable');
    const dataOrArray = data?data:[{data: 1, label: '', empty: true}];
    const svg = select(this.element);
    const color = scaleOrdinal(schemeCategory10);

    const yScale = scaleLinear()
    .domain([0, Math.max(...dataOrArray.map(d => d.data))])
    .range([0, isIcon?100:95]);

    const xScale = scaleBand()
      .domain(dataOrArray.map(d => d.label))
      .range([0, isIcon?100:95])
      .paddingInner(0.12);

    svg.selectAll('.bars').remove();
    const bars = svg.append('g').attr('class', 'bars');

    const rect = bars.selectAll('rect').data(dataOrArray).enter()
      .append('rect')
      .attr('width', `${xScale.bandwidth()}%`)
      .attr('height', d => `${yScale(d.data)}%`)
      .attr('x', d => `${xScale(d.label)}%`)
      .attr('y', d => `${100 - yScale(d.data)}%`)
      .attr('fill', d =>  color(d.label));

      if (!isIcon) {
        rect.on('mouseenter', data => {
          if (hover) {
            const rects = svg.selectAll('rect');
            const selected = rects.filter(rectData => rectData.label === data.label);
            hover(data, selected.node());
          }
        });

        svg.on('mouseleave', () => {
          if (leave) {
            leave();
          }
        });

        const text = bars.selectAll('text').data(dataOrArray).enter()
          .append("text")
          .attr("fill", "#ffffff")
          .style("font-size", ".8rem")
          .attr("text-anchor", "middle")
          .attr('x', d => `${xScale(d.label	) + xScale.bandwidth() / 2}%`)
          .attr('y', d => `${110 - yScale(d.data)}%`)
          .text(d => d.label);

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
