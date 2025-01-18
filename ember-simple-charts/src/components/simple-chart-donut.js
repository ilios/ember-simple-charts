import 'd3-transition';
import { cached, tracked } from '@glimmer/tracking';
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

export default class SimpleChartDonut extends Component {
  @tracked loadingPromise;

  @cached
  get loadingData() {
    return new TrackedAsyncData(this.loadingPromise);
  }

  get isLoading() {
    if (this.args.isIcon) {
      return false;
    }

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
      if (!containerHeight || !containerWidth) {
        return;
      }
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
      const donutWidth = width * 0.2;

      const createArc = arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
      const createPie = pie()
        .value((d) => d.data)
        .sort(null);
      const createLabelArc = arc()
        .outerRadius(radius - 32)
        .innerRadius(radius - 32);

      const handleHover = ({ target }) => {
        const { data } = select(target).datum();
        const slices = svg.selectAll('.slice');
        const selectedSlice = slices.filter(
          ({ data: sliceData }) => sliceData.label === data.label,
        );
        hover(data, selectedSlice.node());
      };

      svg.selectAll('.chart').remove();

      const chart = svg
        .append('g')
        .attr('class', 'chart')
        //move the donut into the center of the chart
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      const path = chart
        .selectAll('.slice')
        .data(createPie(data))
        .enter()
        .append('g')
        .attr('class', 'slice');

      path
        .append('path')
        .attr('class', 'slicepath')
        .attr('d', createArc)
        .attr('stroke', '#FFFFFF')
        .attr('fill', (d) => color(d.data.data));

      if (!isIcon) {
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

        path.each(function (d) {
          const sliceGroup = select(this);

          const text = sliceGroup
            .append('text')
            .style('fill', (d) => {
              return d.data.textForeground ?? 'rgb(0, 0, 0)';
            })
            .style('font-size', '.8rem')
            .style('color', (d) => sliceColor(d.data.data, color))
            .attr('text-anchor', 'middle')
            .attr('transform', `translate(${createLabelArc.centroid(d)})`)
            .text((d) => d.data.label);

          text.on('mouseenter', handleHover);
          text.on('mouseleave', leave);

          if (isClickable) {
            text.on('click', ({ target }) => {
              const { data } = select(target).datum();
              onClick(data);
            });
            text.style('cursor', 'pointer');
          }

          const bbox = text.node().getBBox();

          // Add a rectangle behind the text
          sliceGroup
            .insert('rect', 'text')
            .attr('x', bbox.x - 4)
            .attr('y', bbox.y - 2)
            .attr('width', bbox.width + 8)
            .attr('height', bbox.height + 4)
            .attr('fill', (d) => {
              return d.data.textBackground ?? 'rgba(255, 255, 255, 0)';
            })
            .attr('transform', `translate(${createLabelArc.centroid(d)})`);
        });

        chart
          .selectAll('.slice')
          .filter((d) => d.data.description)
          .append('desc')
          .text((d) => d.data.description);

        path.on('mouseenter', handleHover);
        path.on('mouseleave', leave);

        if (isClickable) {
          path.on('click', ({ target }) => {
            const { data } = select(target).datum();
            onClick(data);
          });
          path.style('cursor', 'pointer');
        }
      }
    },
  );
}
