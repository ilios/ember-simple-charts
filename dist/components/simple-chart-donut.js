
import 'd3-transition';
import { tracked, cached } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { select } from 'd3-selection';
import { scaleSequential } from 'd3-scale';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { arc, pie } from 'd3-shape';
import { easeLinear } from 'd3-ease';
import { interpolate } from 'd3-interpolate';
import { TrackedAsyncData } from 'ember-async-data';
import { modifier } from 'ember-modifier';
import sliceColor from '../utils/slice-color.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  class=\"simple-chart-donut{{if this.isLoading \' loading\' \' loaded\'}}\"\n  height={{@containerHeight}}\n  width={{@containerWidth}}\n  {{this.paint\n    this.dataOrArray\n    @isIcon\n    @isClickable\n    @hover\n    @leave\n    @onClick\n    @containerHeight\n    @containerWidth\n    @textIsNotOutlined\n  }}\n  ...attributes\n></svg>");

class SimpleChartDonut extends Component {
  static {
    g(this.prototype, "loadingPromise", [tracked]);
  }
  #loadingPromise = (i(this, "loadingPromise"), void 0);
  get loadingData() {
    return new TrackedAsyncData(this.loadingPromise);
  }
  static {
    n(this.prototype, "loadingData", [cached]);
  }
  get isLoading() {
    if (this.args.isIcon) {
      return false;
    }
    return !this.loadingPromise || this.loadingData.isPending;
  }
  get dataOrArray() {
    return this.args.data ?? [{
      data: 1,
      label: '',
      empty: true
    }];
  }
  paint = modifier((element, [data, isIcon, isClickable, hover, leave, onClick, containerHeight, containerWidth, textIsNotOutlined]) => {
    if (!containerHeight || !containerWidth) {
      return;
    }
    this.loadingPromise = null;
    const height = Math.min(containerHeight, containerWidth) || 0;
    const width = Math.min(containerHeight, containerWidth) || 0;
    const svg = select(element);
    const radius = Math.min(width, height) / 2;
    const values = data.map(d => d.data);
    const color = scaleSequential(interpolateSinebow).domain([0, Math.max(...values)]);
    const donutWidth = width * 0.2;
    const createArc = arc().innerRadius(radius - donutWidth).outerRadius(radius);
    const createPie = pie().value(d => d.data).sort(null);
    const createLabelArc = arc().outerRadius(radius - 32).innerRadius(radius - 32);
    svg.selectAll('.chart').remove();
    const chart = svg.append('g').attr('class', 'chart')
    //move the donut into the center of the chart
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    const path = chart.selectAll('.slice').data(createPie(data)).enter().append('g').attr('class', 'slice').append('path').attr('class', 'slicepath').attr('d', createArc).attr('stroke', '#FFFFFF').attr('fill', d => color(d.data.data));
    if (!isIcon) {
      this.loadingPromise = chart.selectAll('path.slicepath').transition().ease(easeLinear).duration(500).attrTween('d', b => {
        b.innerRadius = 0;
        const i = interpolate({
          startAngle: 0,
          endAngle: 0
        }, b);
        return p => createArc(i(p));
      }).end();
      const text = chart.selectAll('.slice').append('text').style('fill', d => sliceColor(d.data.data, color)).style('font-size', '.8rem').attr('transform', d => 'translate(' + createLabelArc.centroid(d) + ')').attr('text-anchor', 'middle').each(function () {
        if (!textIsNotOutlined) {
          select(this).append('tspan').attr('class', 'text-outline').attr('fill', d => sliceColor(d.data.data, color, true)).attr('stroke', d => sliceColor(d.data.data, color, true)).attr('stroke-width', '3px').attr('stroke-linejoin', 'round').text(d => d.data.label).append('tspan').attr('x', '0').attr('dy', '0').text('\u200b');
        }
        select(this).append(d => document.createTextNode(d.data.label));
      });
      chart.selectAll('.slice').filter(d => d.data.description).append('desc').text(d => d.data.description);
      const handleHover = ({
        target
      }) => {
        const {
          data
        } = select(target).datum();
        const slices = svg.selectAll('.slice');
        const selectedSlice = slices.filter(({
          data: sliceData
        }) => sliceData.label === data.label);
        hover(data, selectedSlice.node());
      };
      path.on('mouseenter', handleHover);
      text.on('mouseenter', handleHover);
      path.on('mouseleave', leave);
      text.on('mouseleave', leave);
      if (isClickable) {
        path.on('click', ({
          target
        }) => {
          const {
            data
          } = select(target).datum();
          onClick(data);
        });
        path.style('cursor', 'pointer');
        text.on('click', ({
          target
        }) => {
          const {
            data
          } = select(target).datum();
          onClick(data);
        });
        text.style('cursor', 'pointer');
      }
    }
  });
}
setComponentTemplate(TEMPLATE, SimpleChartDonut);

export { SimpleChartDonut as default };
//# sourceMappingURL=simple-chart-donut.js.map
