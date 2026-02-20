import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { select } from 'd3-selection';
import { scaleSequential, scaleLinear, scaleBand } from 'd3-scale';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { modifier } from 'ember-modifier';
import sliceColor from '../utils/slice-color.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class SimpleChartBar extends Component {
  static {
    g(this.prototype, "loading", [tracked], function () {
      return true;
    });
  }
  #loading = (i(this, "loading"), void 0);
  get dataOrArray() {
    return this.args.data ?? [{
      data: 1,
      label: '',
      empty: true
    }];
  }
  paint = modifier((element, [data, isIcon, isClickable, hover, leave, onClick, textIsNotOutlined]) => {
    this.loading = true;
    const svg = select(element);
    const values = data.map(d => d.data);
    const color = scaleSequential(interpolateSinebow).domain([0, Math.max(...values)]);
    const yScale = scaleLinear().domain([0, Math.max(...data.map(d => d.data))]).range([0, isIcon ? 100 : 95]);
    const xScale = scaleBand().domain(data.map(d => d.label)).range([0, isIcon ? 100 : 95]).paddingInner(0.12);
    svg.selectAll('.bars').remove();
    const bars = svg.append('g').attr('class', 'bars');
    const rect = bars.selectAll('rect').data(data).enter().append('rect').attr('width', `${xScale.bandwidth()}%`).attr('height', d => `${yScale(d.data)}%`).attr('x', d => `${xScale(d.label)}%`).attr('y', d => `${100 - yScale(d.data)}%`).attr('fill', d => color(d.data));
    if (!isIcon) {
      const text = bars.selectAll('text').data(data).enter().append('text').style('fill', d => sliceColor(d.data, color)).style('font-size', '.8rem').attr('text-anchor', 'middle').attr('x', d => `${xScale(d.label) + xScale.bandwidth() / 2}%`).attr('y', d => `${110 - yScale(d.data)}%`).each(function () {
        if (!textIsNotOutlined) {
          select(this).append('tspan').attr('class', 'text-outline').attr('fill', d => sliceColor(d.data, color, true)).attr('stroke', d => sliceColor(d.data, color, true)).attr('stroke-width', '3px').attr('stroke-linejoin', 'round').text(d => d.data).append('tspan').attr('x', d => `${xScale(d.label) + xScale.bandwidth() / 2}%`).attr('y', d => `${110 - yScale(d.data)}%`).attr('dy', '0').text('\u200b');
        }
        select(this).append(d => document.createTextNode(d.data));
      });
      bars.selectAll('rect').filter(d => d.description).append('desc').text(d => d.description);
      const handleHover = ({
        target
      }) => {
        const {
          label,
          data,
          meta
        } = select(target).datum();
        const rects = svg.selectAll('rect');
        const selected = rects.filter(rectData => rectData.data === data);
        hover({
          label,
          data,
          meta
        }, selected.node());
      };
      rect.on('mouseenter', handleHover);
      text.on('mouseenter', handleHover);
      rect.on('mouseleave', leave);
      text.on('mouseleave', leave);
      if (isClickable) {
        rect.on('click', ({
          target
        }) => {
          const data = select(target).datum();
          onClick(data);
        });
        rect.style('cursor', 'pointer');
        text.on('click', ({
          target
        }) => {
          const data = select(target).datum();
          onClick(data);
        });
        text.style('cursor', 'pointer');
      }
    }
    this.loading = false;
  });
  static {
    setComponentTemplate(precompileTemplate("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"simple-chart-bar{{if this.loading \" loading\" \" loaded\"}}\" height={{@containerHeight}} width={{@containerWidth}} {{this.paint this.dataOrArray @isIcon @isClickable @hover @leave @onClick @textIsNotOutlined}} ...attributes></svg>", {
      strictMode: true
    }), this);
  }
}

export { SimpleChartBar as default };
//# sourceMappingURL=simple-chart-bar.js.map
