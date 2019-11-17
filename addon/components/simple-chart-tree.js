import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import 'd3-transition';

import { select } from 'd3-selection';
import { hierarchy, tree } from 'd3-hierarchy';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';
export default class SimpleChartDonut extends Component {
  @tracked loading;

  @action
  draw(element, [elementHeight, elementWidth, data]) {
    if (!elementHeight || !elementWidth) {
      return;
    }
    const height = Math.min(elementHeight, elementWidth) || 0;
    const width = Math.min(elementHeight, elementWidth) || 0;
    const dataOrEmptyObject = data ? data : {};
    const svg = select(element);
    const radius = Math.min(5, height / 50);

    const treeLayout = tree().size([height - 15, width - 15]);
    const root = hierarchy(dataOrEmptyObject);
    treeLayout(root);
    const color = scaleSequential(interpolateSinebow).domain([0, Math.max(root.height)]);

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

    if (!this.args.isIcon) {
      nodes.on('mouseenter', ({ data }) => {
        const elements = svg.selectAll('circle.node');
        const selectedElement = elements.filter(({ data: nodeData }) => {
          return nodeData.name === data.name;
        });
        this.args.hover(data, selectedElement.node());
      });
      nodes.on('mouseleave', this.args.leave);

      if (this.args.isClickable) {
        nodes.on('click', ({ data }) => {
          this.args.click(data);
        });
        nodes.style("cursor", "pointer");
      }
    }
  }
}
