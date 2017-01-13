import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
var d3 = require("d3");
import $ from 'jquery';
import Legend from "./Legend.js";

const margin = {top: 10, right: 0, bottom: 30, left: 40};

export default class SimpleChart extends React.Component {
	constructor(props) {
		super(props);

		this.resizeFunc = this.resize.bind(this);

		this.state = {
            width: 0,
            height: 0,
        }
	}

	componentDidMount() {
        $(window).resize(this.resizeFunc);

        const chart = this.initializeChart();

        let w = this.getCurrWidth();
        this.setState({
            chart: chart,
            width: w,
            height: w/2
        })
    }

    initializeChart() {
        const div = new ReactFauxDOM.Element('div');

        this.svg = d3.select(div).append("svg");
        this.g = this.svg.append("g")
        	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.initializeYAxis();
        this.initializeDataElements();
        // this.initializeDataLines();
        // this.initializeTooltip();

        return div;
    }

    initializeYAxis() {
    	this.yAxis = this.g.append("g")
            .attr("class", "axis axis--y");

        this.yAxisLabel = this.yAxis.append("text")
            .attr("class", "data-block__viz__y-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("y", -30)
            .attr("fill", "#000")
            .text("Value");

        this.y = d3.scaleLinear()
        	.domain(this.getYExtents());
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
        
    }

    updateYAxis() {
        const {width, height} = this.state;
        
        this.y.range([height, 0]);
        
        this.yAxis
            .call(d3.axisLeft(this.y).tickSize(-width, 0, 0).tickSizeOuter(0).tickPadding(10));

        this.yAxisLabel
            .attr("x", -height/2);
    }

	render() {
		console.log("calling render");
        let content;

		if (this.state.chart) {
            this.updateChart();
            content = this.state.chart.toReact();
        } else {
            content = "loading chart";
        }
		return (
            <div className="data-block__viz__rendering-area" ref="renderingArea">
                {content}
            </div>
        )
	}

	resize() {
        let w = this.getCurrWidth();
        this.setState({
          width: w,
          height: w/2
        })
        console.log("resizing!");
    }

    componentWillUnmount() {
        $(window).off("resize", this.resizeFunc);
    }

	// helper functions
	getCurrWidth() {
        return $(this.refs.renderingArea).width();
    }

    getYExtents() {
    	const { data, settings } = this.props,
            {variables} = settings;

    	let valList = [];
        for (let variable of variables) {
            let vals = Object.values(data[variable.variable]);
            valList.push(...vals);
        }

        return d3.extent(valList);
    }
}