import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { select } from 'd3-selection';
import { scaleSequential } from 'd3-scale';
import { interpolateSinebow } from 'd3-scale-chromatic';

export default class SimpleChartBox extends Component {
  @tracked loading;

  @action
  draw(element, [elementHeight, elementWidth, data]) {
    if (!elementHeight || !elementWidth) {
      return;
    }
    this.loading = true;
    assert(
      'Box Data contains "allData"',
      Object.keys(data).includes('allData'),
    );
    assert(
      'Box Data contains "boxData"',
      Object.keys(data).includes('boxData'),
    );
    const svg = select(element);
    const values = data.allData.map((o) => o.data);
    const color = scaleSequential(interpolateSinebow).domain([
      0,
      Math.max(...values),
    ]);

    svg.selectAll('.box').remove();
    const box = svg.append('g').attr('class', 'box');

    const rect = box
      .selectAll('rect')
      .data([data.boxData])
      .enter()
      .append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', (d) => color(d.data));

    if (!this.args.isIcon) {
      const handleHover = ({ target }) => {
        const { label, data, meta } = select(target).datum();
        const rects = svg.selectAll('rect');
        const selected = rects.filter((rectData) => rectData.data === data);
        this.args.hover({ label, data, meta }, selected.node());
      };
      rect.on('mouseenter', handleHover);
      rect.on('mouseleave', this.args.leave);

      if (this.args.isClickable) {
        rect.on('click', ({ target }) => {
          const data = select(target).datum();
          this.args.onClick(data);
        });
        rect.style('cursor', 'pointer');
      }
    }
    this.loading = false;
  }
}
