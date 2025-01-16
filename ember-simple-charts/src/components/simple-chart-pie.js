import { cached, tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import 'd3-transition';
import { select } from 'd3-selection';
import { scaleSequential } from 'd3-scale';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { arc, pie } from 'd3-shape';
import { easeLinear } from 'd3-ease';
import { interpolate } from 'd3-interpolate';
import { TrackedAsyncData } from 'ember-async-data';
import { modifier } from 'ember-modifier';

export default class SimpleChartPie extends Component {
  @tracked loadingPromise;

  @cached
  get loadingData() {
    return new TrackedAsyncData(this.loadingPromise);
  }

  get isLoading() {
    return !this.loadingPromise || this.loadingData.isPending;
  }

  get dataOrArray() {
    return this.args.data ?? [{ data: 1, label: '', empty: true }];
  }

  paint = modifier(
    (
      element,
      [
        data,
        isIcon,
        isClickable,
        hover,
        leave,
        onClick,
        containerHeight,
        containerWidth,
      ],
    ) => {
      this.loadingPromise = null;
      const height = Math.min(containerHeight, containerWidth) || 0;
      const width = Math.min(containerHeight, containerWidth) || 0;
      const svg = select(element);
      const radius = Math.min(width, height) / 2;
      const values = data.map((d) => d.data);
      const color = scaleSequential(interpolateSinebow).domain([
        0,
        Math.max(...values),
      ]);

      const createArc = arc().innerRadius(0).outerRadius(radius);
      const createPie = pie()
        .value((d) => d.data)
        .sort(null);
      const createLabelArc = arc()
        .outerRadius(radius - 32)
        .innerRadius(radius - 32);

      svg.selectAll('.chart').remove();
      const chart = svg
        .append('g')
        .attr('class', 'chart')
        //move the pie into the center of the chart
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
      const path = chart
        .selectAll('.slice')
        .data(createPie(data))
        .enter()
        .append('g')
        .attr('class', 'slice')
        .append('path')
        .attr('class', 'slicepath')
        .attr('d', createArc)
        .attr('stroke', '#FFFFFF')
        .attr('fill', (d) => color(d.data.data));

      this.loadingPromise = chart
        .selectAll('path.slicepath')
        .transition()
        .ease(easeLinear)
        .duration(500)
        .attrTween('d', (b) => {
          b.innerRadius = 0;
          const i = interpolate({ startAngle: 0, endAngle: 0 }, b);
          return (p) => createArc(i(p));
        })
        .end();

      if (!isIcon) {
        const text = chart
          .selectAll('.slice')
          .append('text')
          .style('color', (d) => {
            const rgb = color(d.data.data);
            //cut up rgb(1, 99, 245) into parts
            const parts = rgb.substr(4).split(')')[0].split(',');
            const r = parseInt(parts[0], 16);
            const g = parseInt(parts[1], 16);
            const b = parseInt(parts[2], 16);
            //Thanks to https://24ways.org/2010/calculating-color-contrast for this formula
            const yiq = (r * 299 + g * 587 + b * 114) / 1000;

            return yiq >= 256 ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
          })
          .style('font-size', '.8rem')
          .attr(
            'transform',
            (d) => 'translate(' + createLabelArc.centroid(d) + ')',
          )
          .attr('text-anchor', 'middle')
          .text((d) => d.data.label);

        chart
          .selectAll('.slice')
          .filter((d) => d.data.description)
          .append('desc')
          .text((d) => d.data.description);

        const handleHover = ({ target }) => {
          const { data } = select(target).datum();
          const slices = svg.selectAll('.slice');
          const selectedSlice = slices.filter(
            ({ data: sliceData }) => sliceData.label === data.label,
          );
          hover(data, selectedSlice.node());
        };
        path.on('mouseenter', handleHover);
        text.on('mouseenter', handleHover);
        path.on('mouseleave', leave);
        text.on('mouseleave', leave);

        if (isClickable) {
          path.on('click', ({ target }) => {
            const { data } = select(target).datum();
            onClick(data);
          });
          path.style('cursor', 'pointer');
          text.on('click', ({ target }) => {
            const { data } = select(target).datum();
            onClick(data);
          });
          text.style('cursor', 'pointer');
        }
      }
    },
  );
}
