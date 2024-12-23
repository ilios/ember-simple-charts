import 'd3-transition';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { select } from 'd3-selection';
import { pack, hierarchy } from 'd3-hierarchy';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  class=\"simple-chart-pack {{if this.loading \"loading\" \"loaded\"}}\"\n  height={{@containerHeight}}\n  width={{@containerWidth}}\n  {{did-update this.draw @containerHeight @containerWidth @data}}\n  {{did-insert this.draw @containerHeight @containerWidth @data}}\n  ...attributes\n></svg>\n");

class SimpleChartPack extends Component {
  static {
    g(this.prototype, "loading", [tracked]);
  }
  #loading = (i(this, "loading"), void 0);
  draw(element, [elementHeight, elementWidth, data]) {
    if (!elementHeight || !elementWidth) {
      return;
    }
    const height = Math.min(elementHeight, elementWidth) || 0;
    const width = Math.min(elementHeight, elementWidth) || 0;
    const dataOrEmptyObject = data ? data : {};
    const svg = select(element);
    const packLayout = pack().size([height - 15, width - 15]).padding(10);
    const rootNode = hierarchy(dataOrEmptyObject);
    rootNode.sum(d => d.value);
    packLayout(rootNode);
    const color = scaleSequential(interpolateSinebow).domain([0, rootNode.value]);
    svg.selectAll('.chart').remove();
    const chart = svg.append('g').attr('class', 'chart');
    const nodes = chart.selectAll('circle').data(rootNode.descendants()).enter().append('circle').classed('node', true).attr('fill', d => color(d.value)).attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => d.r);
    if (!this.args.isIcon) {
      chart.selectAll('circle').filter(d => d.data.description).append('desc').text(d => d.data.description);
      nodes.on('mouseenter', ({
        target
      }) => {
        const {
          data
        } = select(target).datum();
        const elements = chart.selectAll('circle.node');
        const selectedElement = elements.filter(({
          data: nodeData
        }) => {
          return nodeData.name === data.name;
        });
        this.args.hover(data, selectedElement.node());
      });
      nodes.on('mouseleave', this.args.leave);
      if (this.args.isClickable) {
        nodes.on('click', ({
          target
        }) => {
          const {
            data
          } = select(target).datum();
          this.args.onClick(data);
        });
        nodes.style('cursor', 'pointer');
      }
    }
  }
  static {
    n(this.prototype, "draw", [action]);
  }
}
setComponentTemplate(TEMPLATE, SimpleChartPack);

export { SimpleChartPack as default };
//# sourceMappingURL=simple-chart-pack.js.map
