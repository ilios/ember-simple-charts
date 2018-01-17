import Ember from 'ember';
import ChartProperties from 'ember-simple-charts/mixins/chart-properties';

import { select } from 'd3-selection';
import { scaleOrdinal, scaleBand, scaleLinear, schemeCategory10 } from 'd3-scale';

const { Component, get } = Ember;

export default Component.extend(ChartProperties, {
  classNames: ['simple-chart-horz-bar'],
  draw(){
    const data = get(this, 'data');
    const isIcon = get(this, 'isIcon');
    const hover = get(this, 'hover');
    const leave = get(this, 'leave');
    const click = get(this, 'click');
    const dataOrArray = data?data:[{data: 1, label: '', empty: true}];
    const svg = select(this.element);
    const color = scaleOrdinal(schemeCategory10);

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

        rect.on('click', data => {
          if (click) {
            click(data);
          }
        });

        bars.selectAll('text').data(dataOrArray).enter()
          .append("text")
          .attr("fill", "#ffffff")
          .style("font-size", ".8rem")
          .attr("text-anchor", "end")
          .attr("text-align", "right")
          .attr("alignment-baseline", "central")
          .attr('y', d => `${yScale(d.label) + (yScale.bandwidth() / 2)}%`)
          .attr('x', d => `${xScale(d.data) - 3}%`)
          .text(d => d.label);
      }
  },
});
