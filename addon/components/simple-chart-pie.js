import Ember from 'ember';
import 'd3-transition';

import ChartProperties from 'ember-simple-charts/mixins/chart-properties';

import { select } from 'd3-selection';
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { arc, pie } from 'd3-shape';
import { easeLinear } from 'd3-ease';
import { interpolate } from 'd3-interpolate';

const { Component, get } = Ember;

export default Component.extend(ChartProperties, {
  classNames: ['simple-chart-pie'],
  draw(passedHeight, passedWidth) {
    const height = Math.min(passedHeight, passedWidth);
    const width = Math.min(passedHeight, passedWidth);
    const data = get(this, 'data');
    const dataOrArray = data?data:[{data: 1, label: '', empty: true}];
    const svg = select(this.element);
    const radius = Math.min(width, height) / 2;
    const hover = get(this, 'hover');
    const isIcon = get(this, 'isIcon');
    const leave = get(this, 'leave');
    const click = get(this, 'click');
    const color = scaleOrdinal(schemeCategory10);

    let createArc = arc().innerRadius(0).outerRadius(radius);
    let createPie = pie().value(d => d.data).sort(null);
    let createLabelArc = arc().outerRadius(radius - 32).innerRadius(radius - 32);

    svg.selectAll('.chart').remove();
    const chart = svg.append('g')
      .attr('class', 'chart')
      //move the pie into the center of the chart
      .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');
    const path = chart.selectAll('.slice').data(createPie(dataOrArray)).enter()
      .append('g').attr('class', 'slice')
      .append('path')
      .attr('class', 'slicepath')
      .attr('d', createArc)
      .attr('stroke', '#FFFFFF')
      .attr('fill', d =>  color(d.data.label));

    chart.selectAll('path.slicepath').transition()
      .ease(easeLinear)
      .duration(500)
      .attrTween("d", b =>  {
        b.innerRadius = 0;
        const i = interpolate({startAngle: 0, endAngle: 0}, b);
        return (p) => createArc(i(p));
      });

    if (!isIcon) {
      path.on('mouseenter', ({data}) => {
        if (hover) {
          const slices = svg.selectAll('.slice');
          const selectedSlice = slices.filter(({data: sliceData}) => sliceData.label === data.label);
          hover(data, selectedSlice.node());
        }
      });

      svg.on('mouseleave', () => {
        if (leave) {
          leave();
        }
      });

      path.on('click', ({data}) => {
        if (click) {
          click(data);
        }
      });

      chart.selectAll('.slice')
        .append("text")
        .attr("fill", "#ffffff")
        .style("font-size", ".8rem")
        .attr('transform', d => "translate(" + createLabelArc.centroid(d) + ")")
        .attr("dy", ".40rem")
        .attr("text-anchor", "middle")
        .text(d => d.data.label);
    }
  }
});
