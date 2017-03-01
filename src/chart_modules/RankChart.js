import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
var d3 = require("d3");
import $ from 'jquery';
import LegendQuantize from "../components/LegendQuantize.js";
import Tooltip from "../components/Tooltip.js";
import LineChart from "../chart_modules/LineChart.js";
import BarChart from "../chart_modules/BarChart.js";
import { formatValue } from "../helper_functions/format_value.js";
import { colors } from "../helper_functions/colors.js";

let margin = {top: 10, right: 30, bottom: 30, left: 60};

export default class RankChart extends React.Component {
	constructor(props) {
		super(props);
        let { data } = props;

		this.resizeFunc = this.resize.bind(this);

        console.log(data);

        // for (let i = 0; i < chart1Settings.variables.length; i++) {
        //     let varName = chart1Settings.variables[i].variable;
        //     if (data[varName]) {
        //         fullValList.push(varName);
        //     } else {
        //         this.missingVars.push(varName);
        //         chart1Settings.variables.splice(i, 1);
        //         i--;
        //     }
        // }

        // console.log(chart1Settings.variables);

        // if (chart2Settings) {
        //     for (let i = 0; i < chart2Settings.variables.length; i++) {
        //         let varName = chart2Settings.variables[i].variable;
        //         if (data[varName]) {
        //             fullValList.push(varName);
        //         } else {
        //             this.missingVars.push(varName);
        //             chart2Settings.variables.splice(i, 1);
        //             i--;
        //         }
        //     }

        //     margin.right = 60;
        // }

        // console.log(fullValList);


		this.state = {
            width: 0,
            height: 0,
            tooltipSettings: null,
        }
	}

	componentDidMount() {
        $(window).resize(this.resizeFunc);

        const chart = this.initializeChart();

        let w = this.getCurrWidth();
        this.setState({
            chart: chart,
            width: w,
            height: w/5
        })
    }

    initializeChart() {
        const div = new ReactFauxDOM.Element('div');

        this.svg = d3.select(div).append("svg");
        this.g = this.svg.append("g")
        	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.initializeYAxis();
        this.initializeXAxis();
        this.initializeDataElements();

        return div;
    }

    initializeYAxis() {
        let {settings} = this.props;
    	this.yAxis = this.g.append("g")
            .attr("class", "axis axis--y");

        // this.yAxisLabel = this.yAxis.append("text")
        //     .attr("class", "data-block__viz__y-axis-label")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", -30)
        //     .attr("fill", "#000")
        //     .text("Value");

        this.y = d3.scaleLinear()
        	.domain(this.getYExtents());
    }

    initializeXAxis() {
        let {filter, data} = this.props;

        this.xAxis = this.g.append("g")
            .attr("class", "axis axis--x");

        this.x = d3.scaleBand()
            .paddingInner(0.3)
    }

    initializeDataElements() {
    	const { data, filter, colorScale } = this.props;

	    this.dataBars = this.g.selectAll("rect")
	    	.data(data)
	    	.enter().append("rect")
	    	.attr("class", "bar-chart__data-bar")
            .style("stroke", "white")
            .style("stroke-width", "1px")
            .style("cursor", "pointer")
            .on("mouseover", (d, index, paths) => { return this.mouseoverFunc(d, paths[index], d3.event); })
            .on("mouseout", () => this.mouseoutFunc());
    }

    updateChart() {
        const {width, height} = this.state;

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
        const {width, height} = this.state;
        
        this.y.range([height, 0]);
        
        this.yAxis
            .call(d3.axisLeft(this.y).tickSize(-width, 0, 0).tickSizeOuter(0).tickPadding(10).tickFormat((d) => { return formatValue(d, this.props.filter.format); }));

        // this.yAxisLabel
        //     .attr("x", -height/2);
    }

    updateXAxis() {
        const {width, height} = this.state;
        const {data, filter} = this.props;
        this.x.rangeRound([0, width]);

        let keyList = [];
        let sortedData = data.sort((a, b) => { return a[filter.variable] - b[filter.variable]; });

        sortedData.map((d) => {
            keyList.push(d.state_id);
        });

        this.x.domain(keyList);

        this.xAxis
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.x).tickSize(0).tickValues([]))
    }

    updateDataElements() {
    	const {filter} = this.props;
    	this.dataBars
    		.attr("x", (d) => { return this.x(d.state_id); })
            .attr("y", (d) => { return this.y(d[filter.variable]); })
            .attr("height", (d) => { return this.state.height - this.y(d[filter.variable]); })
            .attr("width", this.x.bandwidth())
            .style("fill", (d) => { return this.setFill(d); })
    }

	render() {
		// const { data, settings } = this.props,

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

	resize() {
        let w = this.getCurrWidth();
        this.setState({
          width: w,
          height: w/5
        })
        console.log("resizing!");
    }

    componentWillUnmount() {
        $(window).off("resize", this.resizeFunc);
    }

    // callback functions

    mouseoverFunc(datum, path, eventObject, variable) {
    	const {filter, hoverChangeFunc} = this.props;
    	hoverChangeFunc(datum.state_id);
    	this.setState({

            tooltipSettings: {
                x: eventObject.offsetX + 10,
                y: eventObject.offsetY - 30,
                title: datum.state,
                value: datum[filter.variable],
                format: filter.format
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
	getCurrWidth() {
        return $(this.refs.renderingArea).width() - margin.left - margin.right;
    }

    getYExtents() {
    	const { filter, data } = this.props;
        if (filter.format == "percent") {
            return [0,1];
        }
        let extents = d3.extent(data, (d) => { return d[filter.variable]; });
        return [0, extents[1]];
    }

    setFill(d) {
    	const {currHovered, colorScale, filter, valsShown} = this.props;

        if (!currHovered || (currHovered && currHovered == d.state_id)) {
            let value = d[filter.variable];
            let binIndex = colorScale.range().indexOf(colorScale(value));
            if (valsShown.indexOf(binIndex) > -1) {
                return colorScale(value);
            }
        }

        return colors.grey.light;
    }
}