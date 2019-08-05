import React from "react";
import * as d3 from "d3";
import { Header } from "semantic-ui-react";

const jStat = require("jstat").jStat;

/**
 * Renders a cumulative distribution frequency line, that reveals the cumulative distribution of
 * distance(trip length) using {distance bins => number of bookings} data.
 */
class CDFChart extends React.Component {
  /** {object}  mobilityData Object containing a mapping of distance bins of 1km intervals => to the number of bookings */
  binData = this.props.mobilityData;
  /** {object}  dimension Object containing the width and height pixel dimensions of the chart */
  dimension = this.props.dimension;

  componentDidMount() {
    this.generateCDFChart();
  }

  generateCDFChart() {
    let margin = { top: 50, right: 50, bottom: 50, left: 50 },
      height = this.dimension.height - margin.top - margin.bottom,
      width = this.dimension.width - margin.left - margin.right;

    // pass list of number of bookings to _binData
    let _binData = Object.values(this.binData);
    let dataset = [];

    /** generate a list of distance values, by exploding the {binData} using the upper bound
     * of the km bins as distance and its associated number of bookings as frequency of occurence in the list.
     * In orther words, this expoldes the {binData} such that a distance appears the number of times of
     * its booking.
     * Example: if {this.binData} is 0-1km=>3, 1-2km=>1, 2-3km=>2, and _binData = [3, 1, 2]
     * {dataset} becomes [1, 1, 1, 2, 3, 3].
     */
    _binData.forEach((item, index) => {
      for (let i = 0; i < item; i++) {
        dataset.push(index + 1);
      }
    });

    /** scale the x-axis to the max distance provided.
     * max distance can be derived from the length of the number of bookings list
     * because each item in the number of bookings list represent a km interval
     * starting at 0->1.
     */
    let maxX = _binData.length;
    let x = d3.scale
      .linear()
      .domain([0, maxX + 1])
      .range([0, width]);

    // generate histogram
    let data = d3.layout.histogram().bins(x.ticks(maxX))(dataset);

    for (let i = 1; i < data.length; i++) {
      data[i].y += data[i - 1].y;
    }

    /**
     * Calculate CDF using jStat - https://github.com/jstat/jstat.
     * Replicates cumulative distribution/frequency line option, available in Excel histograms.
     */
    let jstat = jStat(dataset);
    for (let i = 0; i < data.length; i++) {
      data[i]["cum"] = jstat.normal(jstat.mean(), jstat.stdev()).cdf(data[i].y);
    }

    //Axes and scales
    // scale left y-axis(percentile) to the max cumulative number of bookings.
    let yhist = d3.scale
      .linear()
      .domain([
        0,
        d3.max(data, function(d) {
          return d.y;
        })
      ])
      .range([height, 0]);
    // scale right y-axis(percentile) to 1.00
    let ycum = d3.scale
      .linear()
      .domain([0, 1])
      .range([height, 0]);
    // define x axis position
    let xAxis = d3.svg
      .axis()
      .scale(x)
      .orient("bottom");
    // define left y axis position
    let yAxis = d3.svg
      .axis()
      .scale(yhist)
      .orient("left");
    // define right y axis position
    let yAxis2 = d3.svg
      .axis()
      .scale(ycum)
      .orient("right");
    //Draw svg
    let svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //Draw CDF line
    let guide = d3.svg
      .line()
      .x(function(d) {
        return x(d.x);
      })
      .y(function(d) {
        return ycum(d.cum);
      })
      .interpolate("basis");
    svg
      .append("path")
      .datum(data)
      .attr("d", guide)
      .attr("class", "line");
    //Draw axes
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .style("text-anchor", "end")
      .attr("x", width - 5)
      .attr("dy", "-.71em")
      .text("Km bins");
    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Cumulative Number of Bookings");
    svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + [width, 0] + ")")
      .call(yAxis2)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 4)
      .attr("dy", "-.71em")
      .style("text-anchor", "end")
      .text("CDF");
  }

  render() {
    return (
      <div>
        <Header as="h2">CDF Chart</Header>
        <div ref="cdfcanvas"></div>
      </div>
    );
  }
}

export default CDFChart;
