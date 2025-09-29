
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import 'd3-transition';
import { select } from 'd3-selection';
import { tree, hierarchy } from 'd3-hierarchy';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  class=\"simple-chart-tree {{if this.loading \'loading\' \'loaded\'}}\"\n  height={{@containerHeight}}\n  width={{@containerWidth}}\n  {{this.paint\n    @data\n    @isIcon\n    @isClickable\n    @hover\n    @leave\n    @onClick\n    @containerHeight\n    @containerWidth\n  }}\n  ...attributes\n></svg>");

class SimpleChartTree extends Component {
  static {
    g(this.prototype, "loading", [tracked], function () {
      return true;
    });
  }
  #loading = (i(this, "loading"), void 0);
  paint = modifier((element, [data, isIcon, isClickable, hover, leave, onClick, containerHeight, containerWidth]) => {
    if (!containerHeight || !containerWidth) {
      return;
    }
    this.loading = true;
    const height = Math.min(containerHeight, containerWidth) || 0;
    const width = Math.min(containerHeight, containerWidth) || 0;
    const dataOrEmptyObject = data ? data : {};
    const svg = select(element);
    const radius = Math.min(5, height / 50);
    const treeLayout = tree().size([height - 15, width - 15]);
    const root = hierarchy(dataOrEmptyObject);
    treeLayout(root);
    const color = scaleSequential(interpolateSinebow).domain([0, Math.max(root.height)]);
    svg.selectAll('.chart').remove();
    const chart = svg.append('g').attr('class', 'chart');
    chart.attr('transform', `translate(${radius}, ${radius})`);
    chart.append('g').classed('links', true);
    chart.append('g').classed('nodes', true);

    // Links
    chart.select('.links').selectAll('line.link').data(root.links()).enter().append('line').classed('link', true).attr('stroke', d => color(d.source.depth)).attr('stroke-width', '1px').attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);

    // Nodes
    const nodes = chart.select('.nodes').selectAll('circle.node').data(root.descendants()).enter().append('circle').classed('node', true).attr('fill', d => color(d.depth)).attr('cx', d => d.x).attr('cy', d => d.y).attr('r', radius);
    if (!isIcon) {
      chart.select('.nodes').selectAll('circle.node').filter(d => d.data.description).append('desc').text(d => d.data.description);
      nodes.on('mouseenter', ({
        target
      }) => {
        const {
          data
        } = select(target).datum();
        const elements = svg.selectAll('circle.node');
        const selectedElement = elements.filter(({
          data: nodeData
        }) => {
          return nodeData.name === data.name;
        });
        hover(data, selectedElement.node());
      });
      nodes.on('mouseleave', leave);
      if (isClickable) {
        nodes.on('click', ({
          target
        }) => {
          const {
            data
          } = select(target).datum();
          onClick(data);
        });
        nodes.style('cursor', 'pointer');
      }
    }
    this.loading = false;
  });
}
setComponentTemplate(TEMPLATE, SimpleChartTree);

export { SimpleChartTree as default };
//# sourceMappingURL=simple-chart-tree.js.map
