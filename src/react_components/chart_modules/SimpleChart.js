import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import $ from 'jquery';
import { connect } from 'react-redux'
const d3 = require("d3");

import LegendCategorical from "../components/LegendCategorical.js";
import Tooltip from "../components/Tooltip.js";
import LineChart from "./LineChart.js";
import BarChart from "./BarChart.js";
import GroupedBarChart from "./GroupedBarChart.js";
import { formatValue, roundLegendAxisVal } from "../../helper_functions/format_value.js";
import SvgIcon from '../components/SvgIcon';

const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

class SimpleChart extends React.Component {
	constructor(props) {
        console.log("in simple chart constructor!")
		super(props);
        let { data } = props;
        let { chart1Settings, chart2Settings } = props.settings;

		this.chartType = props.settings.type;
		this.resizeFunc = this.resize.bind(this);

		let fullValList = [];

        this.margin = {top: 10, right: 0, bottom: 30, left: 50};

        for (let i = 0; i < chart1Settings.variables.length; i++) {
            let varName = chart1Settings.variables[i].variable;
            if (data[varName]) {
                for (let year in data[varName]) {
                    if (!isNaN(data[varName][year])) {
                        fullValList.push(varName);
                    }
                }
            } else {
                chart1Settings.variables.splice(i, 1);
                i--;
            }
        }

        if (chart2Settings) {
            for (let i = 0; i < chart2Settings.variables.length; i++) {
                let varName = chart2Settings.variables[i].variable;
                if (data[varName]) {
                    for (let year in data[varName]) {
                        if (!isNaN(data[varName][year])) {
                            fullValList.push(varName);
                        }
                    }
                } else {
                    chart2Settings.variables.splice(i, 1);
                    i--;
                }
            }

            this.margin.right = 50;
        }

		this.state = {
            width: 0,
            height: 0,
            currHovered: null,
            tooltipSettings: null,
            valsShown: fullValList,
        }
	}

	componentDidMount() {
        $(window).resize(this.resizeFunc);

        this.fauxDiv = new ReactFauxDOM.Element('div');

        this.initializeChart(this.props.data);

        let w = this.getCurrWidth();
        this.setState({
            chart: this.fauxDiv,
            width: w,
            height: w/2
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data != nextProps.data || this.props.settings != nextProps.settings) {
            this.svg
                .remove()
            this.initializeChart(nextProps.data);

            this.setState({
                chart: this.fauxDiv
            })
        }
    }

    initializeChart(data) {
        this.svg = d3.select(this.fauxDiv).append("svg");
        this.g = this.svg.append("g")

        this.initializeYScales(data);

        this.g.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        
        this.initializeXScale(data);
        this.initializeYAxes();
        this.initializeXAxis();
        this.initializeDataElements(data);
    }

    initializeYScales(data) {
        let {chart1Settings, chart2Settings} = this.props.settings;

        this.y1 = d3.scaleLinear()
            .domain(this.getYExtents(chart1Settings, data));

        if (this.y1.domain()[1] > 1000000) {
            this.margin.left = 80;
        }

        if (chart2Settings) {
            this.y2 = d3.scaleLinear()
                .domain(this.getYExtents(chart2Settings, data));

            if (this.y2.domain()[1] > 1000000) {
                this.margin.right = 80;
            }
        }
    }

    initializeXScale(currData) {
        let {chart1Settings, chart2Settings} = this.props.settings;

        this.x = d3.scaleBand()
            .paddingInner(0.3)
            .paddingOuter(0.4);

        let keyList = [];

        chart1Settings.variables.map((d) => {
            let data = currData[d.variable];
            let keys = Object.keys(data);
            keys = keys.filter((key) => {
                return !isNaN(data[key]);
            })
            keyList.push(...keys);
        });

        if (chart2Settings) {
            chart2Settings.variables.map((d) => {
                let data = currData[d.variable];
                let keys = Object.keys(data);
                keys = keys.filter((key) => {
                    return !isNaN(data[key]);
                })
                keyList.push(...keys);
            });
        }

        if (keyList.length > 0) {
            let xExtents = d3.extent(keyList);
            this.x.domain(range(+xExtents[0], +xExtents[1]));
        } else {
            this.x.domain([0,0]);
        }
    }

    initializeYAxes() {
        let {chart1Settings, chart2Settings} = this.props.settings;
    	this.yAxis1 = this.g.append("g")
            .attr("class", "axis axis--y");

        if (chart2Settings) {
            this.yAxis2 = this.g.append("g")
                .attr("class", "axis axis--y");
        }
    }

    initializeXAxis() {
        this.xAxis = this.g.append("g")
            .attr("class", "axis axis--x");
    }

    initializeDataElements(data) {
    	const { settings } = this.props,
            {chart1Settings, chart2Settings, dividingLine} = settings;

        if (chart2Settings) {
            this.dataElement2 = this.initializeChartModule(data, chart2Settings);
        }
        this.dataElement1 = this.initializeChartModule(data, chart1Settings);

        if (dividingLine) {
            this.dividingLineLine = this.g.append("line")
                .attr("class", "line-chart__dividing-line")
                .attr("stroke-dasharray", "5, 5");
        }
    }

    initializeChartModule(data, chart) {
        const {variables} = chart;
        let retVal;

        let params = {
            data: data,
            variables: variables,
            domElem: this.g,
            mouseoverFunc: this.mouseoverFunc.bind(this),
            mouseoutFunc: this.mouseoutFunc.bind(this)
        };

        switch (chart.type) {
            case "bar-chart":
                retVal = new BarChart(params);
                break;
            case "grouped-bar-chart":
                retVal = new GroupedBarChart(params);
                break;
            case "line-chart":
                retVal = new LineChart(params);
                break;
            default:
                console.log("No Chart Type");
        }

        return retVal
    }

    updateChart() {
        const {width, height} = this.state;

        this.svg
            .attr("width", "100%")
            .attr("height", height + this.margin.top + this.margin.bottom);

        this.g
            .attr("width", width)
            .attr("height", height);

        this.updateYAxes();
        this.updateXAxis();
        this.updateDataElements();
    }

    updateYAxes() {
        const {width, height} = this.state;
        
        this.y1.range([height, 0]);
        
        this.yAxis1
            .call(d3.axisLeft(this.y1)
                .tickSize(-width, 0, 0)
                .tickSizeOuter(0)
                .tickPadding(10)
                .tickFormat((d) => { return roundLegendAxisVal(d, this.props.settings.chart1Settings.variables[0].format); })
                .ticks(width > 350 ? 8 : 5));

        if (this.y2) {
            this.y2.range([height, 0]);

            this.yAxis2
                .attr("transform", "translate(" + width + ")")
                .call(d3.axisRight(this.y2)
                    .tickSizeOuter(0)
                    .tickSizeInner(0)
                    .tickPadding(10)
                    .tickFormat((d) => { return roundLegendAxisVal(d, this.props.settings.chart2Settings.variables[0].format); })
                    .ticks(width > 350 ? 8 : 5));
        }
    }

    updateXAxis() {
        const {width, height} = this.state;
        this.x.rangeRound([0, width]);

        this.xAxis
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.x).tickSize(0).tickPadding(10)
                .tickFormat(function(e){
                    if(Math.floor(e) != e)
                    {
                        return;
                    }
                    return e;
                })
                .ticks(3)
            );
    }

    updateDataElements() {
        const {dividingLine} = this.props.settings;

        if (dividingLine) {
            let xCoord = this.x(dividingLine.year)

            this.dividingLineLine
                .attr("x1", xCoord)
                .attr("y1", this.y1.range()[0])
                .attr("x2", xCoord)
                .attr("y2", this.y1.range()[1])
                

            let iconStyle = {
                left: xCoord + this.margin.left
            }

            this.dividingLineIcon = <div className="line-chart__dividing-line-icon" style={iconStyle} ><SvgIcon name="question" /></div>
            this.dividingLinePopup = <div className="line-chart__dividing-line-popup">{dividingLine.text}</div>
        }
            
        this.updateChartModule(this.dataElement1, this.y1);
        this.y2 ? this.updateChartModule(this.dataElement2, this.y2) : null;
    }

    updateChartModule(dataElement, yScale) {
    	let updateParams = {
    		y: yScale,
            x: this.x,
    		width: this.state.width,
    		height: this.state.height,
    		currHovered: this.state.currHovered,
    		valsShown: this.state.valsShown
    	}

    	dataElement.update(updateParams);
    }

    toggleVals(valsShown) {
    	this.setState({
            valsShown: valsShown
        });
    }

	render() {
		const { data, settings, currProfileName } = this.props,
            {chart1Settings, chart2Settings} = settings;

        let content, legend, tooltip, missingVarsList, presentVarsList, fullVarsList;
        let variables = chart1Settings.variables;

        if (chart2Settings) {
            variables = variables.concat(chart2Settings.variables);
        }

		if (this.state.chart) {
            this.updateChart();
            content = this.state.chart.toReact();
            legend = <LegendCategorical variables={variables} toggleChartVals={this.toggleVals.bind(this)}/>;
            tooltip = <Tooltip settings={this.state.tooltipSettings} />
        } else {
            content = "loading chart";
        }

        if (this.state.valsShown.length > 0) {
    		return (
                <div className="data-block__viz__rendering-area" ref="renderingArea">
                    {this.dividingLineIcon}
                    {this.dividingLinePopup}
                    {content}
                    {legend}
                    {tooltip}
                </div>
            )
        } else {
            return <h5 className="data-block__viz__no-data-placeholder">There is no data for {currProfileName} in this category</h5>
        }
	}

	resize() {
        let w = this.getCurrWidth();
        this.setState({
          width: w,
          height: w/2
        })
    }

    componentWillUnmount() {
        $(window).off("resize", this.resizeFunc);
    }

    // callback functions

    mouseoverFunc(year, eventObject) {
        let valArray = this.dataElement1.getValArray(year);
        if (this.dataElement2) {
            valArray = [...valArray, ...this.dataElement2.getValArray(year)];
        }
        let renderingAreaWidth = $(this.refs.renderingArea).width();
    	this.setState({
            currHovered: year,
            tooltipSettings: {
                x: eventObject.offsetX,
                y: eventObject.offsetY - 30,
                renderingAreaWidth: renderingAreaWidth,
                title: year,
                valArray: valArray,
            }
        })
    }

    mouseoutFunc() {
    	this.setState({
            currHovered: null,
            tooltipSettings: null
        })
    }

	// helper functions
    
	getCurrWidth() {
        return $(this.refs.renderingArea).width() - this.margin.left - this.margin.right;
    }

    getYExtents(chart, data) {
        if (chart.variables[0] && chart.variables[0].format == "percent") {
            return [0,1];
        }
        const variables = chart.variables;

    	let valList = [];
        for (let variable of variables) {
            let vals = Object.values(data[variable.variable]);
            vals = vals.filter((d) => { return !isNaN(d);})
            valList.push(...vals);
        }

        if (Array.from(new Set(valList)).length == 1) {
            return [0, valList[0]];
        }

        return [0, d3.max(valList)];
    }

    reInitializeChart() {
        this.svg
            .remove()
        this.initializeChart(nextProps.data);

        this.setState({
            chart: this.fauxDiv
        })
    }
}

const mapStateToProps = (state) => {
  return {
    currProfileName: state.currProfile ? state.currProfile.name : null
  }
}

export default connect(mapStateToProps)(SimpleChart);