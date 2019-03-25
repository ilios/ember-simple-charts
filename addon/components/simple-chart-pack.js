import Component from '@ember/component';
import { get } from '@ember/object';
import 'd3-transition';

import ChartProperties from 'ember-simple-charts/mixins/chart-properties';

import { select } from 'd3-selection';
import { hierarchy, pack } from 'd3-hierarchy';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';
export default Component.extend(ChartProperties, {
  classNames: ['simple-chart-pack'],
  draw(passedHeight, passedWidth) {
    const height = Math.min(passedHeight, passedWidth);
    const width = Math.min(passedHeight, passedWidth);
    const data = get(this, 'data');
    const dataOrEmptyObject = data ? data : {};
    const svg = select(this.element);
    const isIcon = get(this, 'isIcon');
    const hover = get(this, 'hover');
    const leave = get(this, 'leave');
    const click = get(this, 'click');
    const isClickable = get(this, 'isClickable');

    const packLayout = pack().size([height - 15, width - 15]).padding(10);
    const rootNode = hierarchy(dataOrEmptyObject);
    rootNode.sum(d => d.value );
    packLayout(rootNode);
    const color = scaleSequential(interpolateSinebow).domain([0, rootNode.value]);

    svg.selectAll('.chart').remove();
    const chart = svg.append('g')
      .attr('class', 'chart');

    const nodes = chart.selectAll('circle')
      .data(rootNode.descendants())
      .enter()
      .append('circle')
      .classed('node', true)
      .attr('fill', d => color(d.value))
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r);

    if (!isIcon) {
      nodes.on('mouseenter', ({ data }) => {
        const elements = chart.selectAll('circle.node');
        const selectedElement = elements.filter(({ data: nodeData }) => {
          return nodeData.name === data.name;
        });
        hover(data, selectedElement.node());
      });
      nodes.on('mouseleave', leave);

      if (isClickable) {
        nodes.on('click', ({ data }) => {
          click(data);
        });
        nodes.style("cursor", "pointer");
      }
    }
  },
});
