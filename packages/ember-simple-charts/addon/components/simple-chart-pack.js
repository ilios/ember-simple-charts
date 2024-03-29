import 'd3-transition';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { action } from '@ember/object';

import { select } from 'd3-selection';
import { hierarchy, pack } from 'd3-hierarchy';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';
export default class SimpleChartPack extends Component {
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

    const packLayout = pack()
      .size([height - 15, width - 15])
      .padding(10);
    const rootNode = hierarchy(dataOrEmptyObject);
    rootNode.sum((d) => d.value);
    packLayout(rootNode);
    const color = scaleSequential(interpolateSinebow).domain([
      0,
      rootNode.value,
    ]);

    svg.selectAll('.chart').remove();
    const chart = svg.append('g').attr('class', 'chart');

    const nodes = chart
      .selectAll('circle')
      .data(rootNode.descendants())
      .enter()
      .append('circle')
      .classed('node', true)
      .attr('fill', (d) => color(d.value))
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', (d) => d.r);

    if (!this.args.isIcon) {
      chart
        .selectAll('circle')
        .filter((d) => d.data.description)
        .append('desc')
        .text((d) => d.data.description);

      nodes.on('mouseenter', ({ target }) => {
        const { data } = select(target).datum();
        const elements = chart.selectAll('circle.node');
        const selectedElement = elements.filter(({ data: nodeData }) => {
          return nodeData.name === data.name;
        });
        this.args.hover(data, selectedElement.node());
      });
      nodes.on('mouseleave', this.args.leave);

      if (this.args.isClickable) {
        nodes.on('click', ({ target }) => {
          const { data } = select(target).datum();
          this.args.onClick(data);
        });
        nodes.style('cursor', 'pointer');
      }
    }
  }
}
