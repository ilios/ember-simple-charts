import { cached, tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear, scaleSequential } from 'd3-scale';
import { interpolateSinebow } from 'd3-scale-chromatic';
import { timeout, restartableTask } from 'ember-concurrency';

export default class SimpleChartBar extends Component {
  @tracked loading = true;
  @tracked element = null;

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
      this.args.isIcon,
      this.args.isClickable,
      this.args.hover,
      this.args.leave,
      this.args.onClick,
    );
    return true;
  }

  paint = restartableTask(
    async (element, data, isIcon, isClickable, hover, leave, onClick) => {
      await timeout(1); //wait a beat to let the loading value settle
      this.loading = true;
      const svg = select(element);
      const values = data.map((d) => d.data);
      const color = scaleSequential(interpolateSinebow).domain([
        0,
        Math.max(...values),
      ]);

      const yScale = scaleLinear()
        .domain([0, Math.max(...data.map((d) => d.data))])
        .range([0, isIcon ? 100 : 95]);

      const xScale = scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, isIcon ? 100 : 95])
        .paddingInner(0.12);

      svg.selectAll('.bars').remove();
      const bars = svg.append('g').attr('class', 'bars');

      const rect = bars
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', `${xScale.bandwidth()}%`)
        .attr('height', (d) => `${yScale(d.data)}%`)
        .attr('x', (d) => `${xScale(d.label)}%`)
        .attr('y', (d) => `${100 - yScale(d.data)}%`)
        .attr('fill', (d) => color(d.data));

      if (!isIcon) {
        const text = bars
          .selectAll('text')
          .data(data)
          .enter()
          .append('text')
          .style('color', (d) => {
            const rgb = color(d.data);
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
          .attr('text-anchor', 'middle')
          .attr('x', (d) => `${xScale(d.label) + xScale.bandwidth() / 2}%`)
          .attr('y', (d) => `${110 - yScale(d.data)}%`)
          .text((d) => d.data);

        bars
          .selectAll('rect')
          .filter((d) => d.description)
          .append('desc')
          .text((d) => d.description);

        const handleHover = ({ target }) => {
          const { label, data, meta } = select(target).datum();
          const rects = svg.selectAll('rect');
          const selected = rects.filter((rectData) => rectData.data === data);
          hover({ label, data, meta }, selected.node());
        };
        rect.on('mouseenter', handleHover);
        text.on('mouseenter', handleHover);
        rect.on('mouseleave', leave);
        text.on('mouseleave', leave);

        if (isClickable) {
          rect.on('click', ({ target }) => {
            const data = select(target).datum();
            onClick(data);
          });
          rect.style('cursor', 'pointer');
          text.on('click', ({ target }) => {
            const data = select(target).datum();
            onClick(data);
          });
          text.style('cursor', 'pointer');
        }
      }
      this.loading = false;
    },
  );
}
