import Ember from 'ember';

import { select } from 'd3-selection';
import { scaleOrdinal, scaleBand, scaleLinear, schemeCategory10 } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { stack } from 'd3-shape';

const { Component, run, get } = Ember;

export default Component.extend({
  tagName: 'svg',
  classNames: ['simple-chart-stacked-bar'],
  attributeBindings: ['width', 'height'],
  didReceiveAttrs() {
    // Anytime we get an update schedule a draw
    run.scheduleOnce('afterRender', this, this.draw);
  },
  data: null,
  width: null,
  height: null,
  draw(){
    const data = get(this, 'data');
    const dataOrArray = data?data:[{data: 1, label: '', value0: '', value1: '', value2: '', value3: '', value4: '', value5: '', empty: true}];
    const svg = select(this.element);
    const width = get(this, 'width');
    const height = get(this, 'height');
    const isIcon = width < 100 || height < 100;
    const margin = isIcon ? {top: 0, right: 0, bottom: 0, left: 0} : {top: 10, right: 20, bottom: 30, left: 25};
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = scaleBand().range([0, chartWidth]).padding(0.4);
    const y = scaleLinear().range([chartHeight, 0]);
    const z = scaleOrdinal(schemeCategory10);

    var keys = ['value0', 'value1', 'value2', 'value3', 'value4', 'value5'];

    if (dataOrArray.length === 0) {
      return;
    }

    x.domain(dataOrArray.map(d => d.label));
    y.domain([0, max(dataOrArray, d => d.data)]);
    z.domain(keys);

    const container = svg.append('g').attr('transform', "translate(" + margin.left + "," + margin.top + ")");

    let labels = container;
    if (!isIcon) {
      labels = container.append("g").attr("transform", "translate(0," + chartHeight + ")").call(axisBottom(x))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(75)")
        .style("text-anchor", "start");
    }

    let maxLabelBottomPosition = height;
    labels.each(function(label, index, allLabels) {
      const currentLabel = allLabels[index];
      const labelDimensions = currentLabel.getBoundingClientRect();
      maxLabelBottomPosition = Math.max(maxLabelBottomPosition, chartHeight + labelDimensions.height + margin.bottom);
    });
    svg.attr('style', 'width:' + width +'px;height:' + maxLabelBottomPosition +'px;');

    if (!isIcon) {
      container.append("g").call(axisLeft(y))
      .selectAll("text")
      .attr("x", -8)
      .attr("y", y(y.ticks(10).pop()) + 0.5)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("fill", "#000");
    }

    container.selectAll('.bar')
      .data(stack().keys(keys)(dataOrArray))
      .enter().append("g")
      .attr("class", "bar")
      .attr("fill", d => { return z(d.key); })
      .selectAll("rect")
      .data(d => { return d; })
        .enter().append("rect")
        .attr("x", d => { return x(d.data.label); })
        .attr("y", d => { return y(d[1]); })
        .attr("height", d => {return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());

  },
});
