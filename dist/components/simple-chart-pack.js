import Component from '@glimmer/component';
import 'd3-transition';
import { tracked } from '@glimmer/tracking';
import { select } from 'd3-selection';
import { pack, hierarchy } from 'd3-hierarchy';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class SimpleChartPack extends Component {
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
    const packLayout = pack().size([height - 15, width - 15]).padding(10);
    const rootNode = hierarchy(dataOrEmptyObject);
    rootNode.sum(d => d.value);
    packLayout(rootNode);
    const color = scaleSequential(interpolateSinebow).domain([0, rootNode.value]);
    svg.selectAll('.chart').remove();
    const chart = svg.append('g').attr('class', 'chart');
    const nodes = chart.selectAll('circle').data(rootNode.descendants()).enter().append('circle').classed('node', true).attr('fill', d => color(d.value)).attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => d.r);
    if (!isIcon) {
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
  static {
    setComponentTemplate(precompileTemplate("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"simple-chart-pack{{if this.loading \" loading\" \" loaded\"}}\" height={{@containerHeight}} width={{@containerWidth}} {{this.paint @data @isIcon @isClickable @hover @leave @onClick @containerHeight @containerWidth}} ...attributes></svg>", {
      strictMode: true
    }), this);
  }
}

export { SimpleChartPack as default };
//# sourceMappingURL=simple-chart-pack.js.map
