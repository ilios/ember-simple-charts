import Component from '@ember/component';
import { get } from '@ember/object';
import 'd3-transition';

import ChartProperties from 'ember-simple-charts/mixins/chart-properties';

import { select } from 'd3-selection';
import { hierarchy, cluster } from 'd3-hierarchy';
import { interpolateOranges } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';
export default Component.extend(ChartProperties, {
  classNames: ['simple-chart-cluster'],
  draw(passedHeight, passedWidth) {
    const height = Math.min(passedHeight, passedWidth);
    const width = Math.min(passedHeight, passedWidth);
    const data = get(this, 'data');
    const svg = select(this.element);
    const radius = height / 50;
    const isIcon = get(this, 'isIcon');
    const hover = get(this, 'hover');
    const leave = get(this, 'leave');
    const click = get(this, 'click');
    const isClickable = get(this, 'isClickable');

    const clusterLayout = cluster().size([height - 15, width - 15]);
    const root = hierarchy(data);
    clusterLayout(root);
    const color = scaleSequential(interpolateOranges).domain([0, Math.max(root.height)]);

    svg.selectAll('.chart').remove();
    const chart = svg.append('g')
      .attr('class', 'chart');
    chart.attr('transform', `translate(${radius}, ${radius})`);
    chart.append('g').classed('links', true);
    chart.append('g').classed('nodes', true);

    // Links
    chart.select('.links')
      .selectAll('line.link')
      .data(root.links())
      .enter()
      .append('line')
      .classed('link', true)
      .attr('stroke', d => color(d.source.depth))
      .attr('stroke-width', '1px')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    // Nodes
    const nodes = chart.select('.nodes')
      .selectAll('circle.node')
      .data(root.descendants())
      .enter()
      .append('circle')
      .classed('node', true)
      .attr('fill', d => color(d.depth))
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', radius);

      if (!isIcon) {
        nodes.on('mouseenter', ({ data }) => {
          const elements = svg.selectAll('circle.node');
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
