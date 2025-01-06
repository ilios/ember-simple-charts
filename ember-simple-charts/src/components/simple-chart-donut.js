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

import { timeout, restartableTask } from 'ember-concurrency';

export default class SimpleChartDonut extends Component {
  @tracked loadingPromise;
  @tracked element = null;

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

  /**
   * We use isPainted to trigger a re-render of the chart
   * Passing all the values we need to render through this getter
   * so it will re-fire if these values change
   */
  @cached
  get isPainted() {
    this.paint.perform(
      this.element,
      this.dataOrArray,
      this.args.containerHeight,
      this.args.containerWidth,
      this.args.isIcon,
      this.args.isClickable,
      this.args.hover,
      this.args.leave,
      this.args.onClick,
    );
    return true;
  }

  paint = restartableTask(
    async (
      element,
      data,
      containerHeight,
      containerWidth,
      isIcon,
      isClickable,
      hover,
      leave,
      onClick,
    ) => {
      await timeout(1); //wait a beat to let the loading value settle
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

      if (!this.args.isIcon) {
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
