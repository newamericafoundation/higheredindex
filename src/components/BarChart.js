import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
var d3 = require("d3");
import $ from 'jquery';
import Legend from "./Legend.js";

const margin = {top: 10, right: 0, bottom: 30, left: 40};

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.resizeFunc = this.resize.bind(this);
        
        let fullValList = [];
        for (let variable of props.settings.variables) {
            fullValList.push(variable.variable);
        }

        this.state = {
            width: 0,
            height: 0,
            currHovered: null,
            tooltipSettings: null,
            valsShown: fullValList
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

    componentWillUnmount() {
        $(window).off("resize", this.resizeFunc);
    }

    resize() {
        let w = this.getCurrWidth();
        this.setState({
          width: w,
          height: w/2
        })
        console.log("resizing!");
    }

    getCurrWidth() {
        return $(this.refs.renderingArea).width() - margin.left - margin.right;
    }

    initializeChart() {
        const div = new ReactFauxDOM.Element('div');

        this.svg = d3.select(div).append("svg");
        this.g = this.svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.initializeAxes();
        this.initializeDataBars();
        this.initializeTooltip();

        return div;
    }

    initializeAxes() {
        const { data, settings } = this.props,
            {variables} = settings;

        this.x = d3.scaleBand();
        this.y = d3.scaleLinear();
        
        this.yAxis = this.g.append("g")
            .attr("class", "axis axis--y");

        this.yAxisLabel = this.yAxis.append("text")
            .attr("class", "data-block__viz__y-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("y", -30)
            .attr("fill", "#000")
            .text("Value");

        this.xAxis = this.g.append("g")
            .attr("class", "axis axis--x");

        let keyList = [],
            valList = [];

        for (let variable of variables) {
            let varName = variable.variable;
            
            let keys = Object.keys(data[varName]);
            let vals = Object.values(data[varName]);

            keyList.push(...keys);
            valList.push(...vals);
        }
        // de-duplication
        keyList = Array.from(new Set(keyList));

        // let xExtents = d3.extent(keyList)
        this.x.domain(keyList);

        this.y.domain(d3.extent(valList));
    }

    initializeDataBars() {
        const { data, settings } = this.props,
            {variables} = settings;

        this.dataBars = {};
        for (let variable of variables) {
            console.log(variable);
            let varName = variable.variable
            this.dataBars[varName] = {};
          
            // this.dataBars[varName].path = this.g.append("path")
            //     .attr("class", "line-chart__data-line")
            //     .style("fill", "none")
            //     .style("stroke-width", "1.5px");

            this.dataBars[varName].bars = {};

            for (let key in data[varName]) {
                let currBar = this.g.append("rect")
                    .attr("class", "bar-chart__data-bar")
                    .style("stroke-width", "1.5px")
                    .on("mouseover", () => {
                        console.log(d3.event);
                        this.setState({
                            currHovered: currBar,
                            tooltipSettings: {
                                x: d3.event.pageX + 10,
                                y: d3.event.pageY - 30,
                                title: key,
                                value: String(data[varName][key])
                            }
                        })
                    })
                    .on("mouseout", () => {
                        this.setState({
                            currHovered: null,
                            tooltipSettings: null
                        })
                    });

                this.dataBars[varName].bars[key] = currBar;
            }
        }
    }

    initializeTooltip() {
        this.tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");

        this.tooltipTitle = this.tooltip.append("h5")
            .attr("class", "tooltip__title");

        this.tooltipValue = this.tooltip.append("h5")
            .attr("class", "tooltip__value");
    }
    

    updateChart() {
        let {width, height} = this.state;

        this.svg
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom);

        this.g
            .attr("width", width - margin.left - margin.right)
            .attr("height", height);

        this.updateAxes();
        this.updateDataBars();
        this.updateTooltip();
    }

    updateAxes() {
        let {width, height} = this.state;
        this.x.rangeRound([0, width]).padding(0.5);
        this.y.range([height, 0]);
        
        this.yAxis
            .call(d3.axisLeft(this.y).tickSize(-width, 0, 0).tickSizeOuter(0).tickPadding(10));

        this.yAxisLabel
            .attr("x", -height/2)

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
            );
    }

    updateDataBars() {
        const { data, settings } = this.props,
            {variables} = settings;

        // const getLine = (dataObject) => {
        //   let line = d3.line()
        //     .x(d => {return this.x(d); })
        //     .y(d => {return this.y(dataObject[d]); });

        //   return line(Object.keys(dataObject));
        // }

        for (let varName in this.dataBars) {
            // this.dataBars[varName].path
            //     .attr("d", getLine(data[varName]));

            for (let key in this.dataBars[varName].bars) {
                this.dataBars[varName].bars[key]
                    .attr("x", this.x(key))
                    .attr("y", this.y(data[varName][key]))
                    .attr("width", this.x.bandwidth())
                    .attr("height", this.state.height - this.y(data[varName][key]))
            }
        }

        for (let variable of variables) {
            let varName = variable.variable
            // this.dataBars[varName].path
            //     .style("stroke", variable.color)
            //     .classed("disabled", this.state.valsShown.indexOf(varName) == -1)

            let fillColor;
            for (let key in this.dataBars[varName].bars) {
                let dataBar = this.dataBars[varName].bars[key];
                fillColor = this.state.currHovered == dataBar ? variable.color : "white";
                dataBar
                    .style("fill", fillColor)
                    .style("stroke", variable.color)
                    .classed("disabled", this.state.valsShown.indexOf(varName) == -1)
            }
        }
    }

    updateTooltip() {
        const {tooltipSettings} = this.state;
        if (tooltipSettings) {
            console.log(tooltipSettings);
            this.tooltip
                .style("display", "block")
                .style("left", tooltipSettings.x + "px")
                .style("top", tooltipSettings.y + "px")

            this.tooltipTitle
                .text(tooltipSettings.title);

             this.tooltipValue
                .text(tooltipSettings.value);

        } else {
            this.tooltip.style("display", "none");
        }
    }

    toggleVals(valsShown) {
        console.log("toggling values");
        console.log(this);
        console.log(valsShown);
        this.setState({
            valsShown: valsShown
        });
    }

    render() {
        console.log("calling render");
        let content;

        const { data, settings } = this.props,
            {variables} = settings;

        if (this.state.chart) {
            this.updateChart();
            content = this.state.chart.toReact();
        } else {
            content = "loading chart";
        }
        return (
            <div className="data-block__viz__rendering-area" ref="renderingArea">
                {content}
                <Legend variables={variables} toggleChartVals={this.toggleVals.bind(this)}/>
            </div>
        )
    }

}