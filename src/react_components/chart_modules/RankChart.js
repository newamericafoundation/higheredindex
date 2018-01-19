import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';
const d3 = require("d3");

import LegendQuantize from "../components/LegendQuantize.js";
import Tooltip from "../components/Tooltip.js";
import LineChart from "./LineChart.js";
import BarChart from "./BarChart.js";
import { formatValue, roundLegendAxisVal } from "../../helper_functions/format_value.js";
import { colors } from "../../helper_functions/colors.js";

let margin = {top: 10, right: 30, bottom: 30, left: 60};

export default class RankChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            tooltipSettings: null,
        }
	}

    componentWillReceiveProps(nextProps) {
        if (this.props.filter.variable != nextProps.filter.variable) {
            this.filterChanged(nextProps);
        }
    }

    filterChanged(nextProps) {
        const { data, filter} = nextProps;
        this.dataBars.remove()
        this.dataLabels.remove()

        this.y.domain(this.getYExtents(nextProps))

        let keyList = [];
        let sortedData = data.sort((a, b) => {
            if (isNaN(a[filter.variable])) {
                return -1
            }
            if (isNaN(b[filter.variable])) {
                return 1
            }
            if (a[filter.variable] === b[filter.variable]) {
                return a.state_id - b.state_id
            } else {
                return a[filter.variable] - b[filter.variable]; 
            }
        });

        sortedData.map((d) => {
            keyList.push(d.state_id);
        });

        this.x.domain(keyList);

        this.initializeDataElements(nextProps)
    }

	componentDidMount() {
        const chart = this.initializeChart();
        this.setState({
            chart: chart,
        })
    }

    initializeChart() {
        const div = new ReactFauxDOM.Element('div');

        this.svg = d3.select(div).append("svg");
        this.g = this.svg.append("g")
        	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.initializeYAxis();
        this.initializeXAxis();
        this.initializeDataElements(this.props);

        return div;
    }

    initializeYAxis() {
        let {settings} = this.props;
    	this.yAxis = this.g.append("g")
            .attr("class", "axis axis--y");

        this.y = d3.scaleLinear()
        	.domain(this.getYExtents(this.props));
    }

    initializeXAxis() {
        let {filter, data} = this.props;

        this.xAxis = this.g.append("g")
            .attr("class", "axis axis--x");

        this.x = d3.scaleBand()
            .paddingInner(0)
    }

    initializeDataElements(propsObject) {
    	const { data, filter, colorScale } = propsObject;

	    this.dataBars = this.g.selectAll("rect")
	    	.data(data.filter((d) => { return !isNaN(d[filter.variable])}))
	    	.enter().append("rect")
	    	.attr("class", "bar-chart__data-bar")
            .style("stroke", "white")
            .style("stroke-width", "1px")
            .style("cursor", "pointer")
            .on("mouseover", (d, index, paths) => { return this.mouseoverFunc(d, paths[index], d3.event); })
            .on("mouseout", () => this.mouseoutFunc())
            .on("click", (d) => {
                let url = "/state/" + d.path;
                url += filter.profileAnchor ? "#" + filter.profileAnchor : "";
                browserHistory.push(url);
            })

        this.dataLabels = this.g.selectAll("text")
            .data(data.filter((d) => { return !isNaN(d[filter.variable])}))
            .enter().append("text")
            .attr("class", "bar-chart__data-label")
    }

    updateChart() {
        const {width, height} = this.props;

        this.svg
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom);

        this.g
            .attr("width", width - margin.left - margin.right)
            .attr("height", height);

        this.updateYAxis();
        this.updateXAxis();
        this.updateDataElements();
    }

    updateYAxis() {
        const {width, height} = this.props;
        
        this.y.range([height, 0]);

        let axis = d3.axisLeft(this.y)
            .tickSize(-width + margin.left + margin.right, 0, 0)
            .tickSizeOuter(0)
            .tickPadding(10)
            .tickFormat((d) => { 
                if (this.props.filter.format == "percent") {
                    return formatValue(d, "percent");
                } else if (this.props.filter.format === "integer") {
                    return d3.format("d")(d)
                } else {
                    return roundLegendAxisVal(d, this.props.filter.format); 
                }
            })

        if (this.props.filter.format === "integer") {
            axis.ticks(this.y.domain()[1] + 1)
        }
        
        this.yAxis
            .call(axis);
    }

    updateXAxis() {
        const {data, filter, width, height} = this.props;
        this.x.range([0, width - margin.left - margin.right]);

        let keyList = [];
        let sortedData = data.sort((a, b) => {
            if (isNaN(a[filter.variable])) {
                return -1
            }
            if (isNaN(b[filter.variable])) {
                return 1
            }
            if (a[filter.variable] === b[filter.variable]) {
                return a.state_id - b.state_id
            } else {
                return a[filter.variable] - b[filter.variable]; 
            }
        });

        sortedData.map((d) => {
            keyList.push(d.state_id);
        });

        this.x.domain(keyList);

        this.xAxis
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.x).tickSize(0).tickValues([]))
    }

    updateDataElements() {
    	const {filter, height, width} = this.props;

    	this.dataBars
    		.attr("x", (d) => { return this.x(d.state_id); })
            .attr("y", (d) => { return this.y(d[filter.variable]); })
            .attr("height", (d) => { return height - this.y(d[filter.variable]); })
            .attr("width", this.x.bandwidth())
            .style("fill", (d) => { return this.setFill(d); })
            .style("pointer-events", (d) => { return this.setFill(d) == colors.grey.light ? "none" : "auto"; })

        this.dataLabels
            .attr("x", (d) => { return this.x(d.state_id) + this.x.bandwidth()/2; })
            .attr("y", (d) => { return this.y(d[filter.variable]) + 5; })
            .style("visibility", (d) => { return width < 800 || (height - this.y(d[filter.variable])) < 15 ? "hidden" : "visible"})
            .style("fill", "white")
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .style("pointer-events", "none")
            .style("text-anchor", "middle")
            .style("alignment-baseline", "hanging")
            .text((d) => { return d.abbreviation; })
    }

	render() {
        let content, legend, tooltip;

		if (this.state.chart) {
            this.updateChart();
            content = this.state.chart.toReact();
            tooltip = <Tooltip settings={this.state.tooltipSettings} />
        } else {
            content = "loading chart";
        }
		return (
            <div className="data-block__viz__rendering-area" ref="renderingArea">
                {content}
                {legend}
                {tooltip}
            </div>
        )
	}

    // callback functions

    mouseoverFunc(datum, path, eventObject, variable) {
    	const {filter, hoverChangeFunc, colorScale, width} = this.props;
    	hoverChangeFunc(datum.state_id);
        let varSettings = {};
        Object.assign(varSettings, filter);
        varSettings.color = colorScale(datum[filter.variable])
    	this.setState({
            tooltipSettings: {
                x: eventObject.offsetX + 20,
                y: eventObject.offsetY - 30,
                renderingAreaWidth: width,
                title: datum.name,
                value: datum[filter.variable],
                valArray: [{ variable: varSettings, value:datum[filter.variable] }],
            }
        })    
    }

    mouseoutFunc() {
    	const {hoverChangeFunc} = this.props;
    	hoverChangeFunc(null);
    	this.setState({
            tooltipSettings: null
        })
    }

	// helper functions

    getYExtents(propsObject) {
    	const { filter, data } = propsObject;
        if (filter.format == "percent") {
            return [0,1];
        }
        let extents = d3.extent(data.filter(d => !isNaN(d[filter.variable])), (d) => { return d[filter.variable]; });
        return [0, extents[1]];
    }

    setFill(d) {
    	const {currHovered, colorScale, filter, valsShown} = this.props;

        let value = d[filter.variable];
        let binIndex = colorScale.range().indexOf(colorScale(value));
        if (valsShown.indexOf(binIndex) > -1) {
            if (!currHovered || (currHovered && currHovered == d.state_id)) {
                return value ? colorScale(value) : colors.grey.medium;
            } else {
                return colors.grey.medium;
            }
        }

        return colors.grey.light;
    }
}