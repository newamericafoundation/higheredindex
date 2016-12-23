import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
var d3 = require("d3");
import $ from 'jquery';

const margin = {top: 10, right: 80, bottom: 30, left: 30};

export default class LineChart extends React.Component {
    constructor() {
        super();
        
        this.state = {
            width: 0,
            height: 0
        }
    }
    componentDidMount() {
        console.log("calling component did mount");
        $(window).bind("resize", this.resize.bind(this));

        const chart = this.initializeChart();

        let w = this.getCurrWidth();
        this.setState({
            chart: chart,
            width: w,
            height: 250
        })
    }

    componentWillUnmount() {
        $(window).unbind("resize", this.resize.bind(this));
    }

    resize() {
        let w = this.getCurrWidth();
        this.setState({
          width: w,
          height: 250
        })
        console.log("resizing!");
    }

    getCurrWidth() {
        return $(this.refs.renderingArea).width();
    }

    // componentDidMount() {
    //     let w = this.props.resizeFunc();
    //     console.log(w);
    //     window.onresize = this.resize.bind(this);
    // }
    // resize() {
    //     console.log("in line chart calling resize");
    //     let w = this.props.resizeFunc();
    //     console.log(w);
    //     this.setState({
    //         width: w
    //     });
    // }
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
            <div ref="renderingArea">
                {content}
            </div>
        )
    }

    initializeChart() {
        const { data, settings } = this.props,
            {variables} = settings;

        const div = new ReactFauxDOM.Element('div');

        this.svg = d3.select(div).append("svg");
        this.g = this.svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.x = d3.scaleLinear();
        this.y = d3.scaleLinear();
        this.z = d3.scaleOrdinal(d3.schemeCategory10);


        this.xAxis = this.g.append("g")
            .attr("class", "axis axis--x");
        
        this.yAxis = this.g.append("g")
            .attr("class", "axis axis--y");

        this.yAxis.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .text("Value");

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
        this.x.domain(d3.extent(keyList));

        this.y.domain(d3.extent(valList));

        this.z.domain(variables);

        this.dataLines = {};

        for (let variable of variables) {
            console.log(variable);
            let varName = variable.variable
            this.dataLines[varName] = {};
          
            this.dataLines[varName].path = this.g.append("path")
                .style("fill", "none")
                .style("stroke", variable.color)
                .style("stroke-width", "1.5px");

            this.dataLines[varName].circles = {};

            for (let key in data[varName]) {
                this.dataLines[varName].circles[key] = this.g.append("circle")
                    .attr("r", 3)
                    .style("fill", "white")
                    .style("stroke", variable.color)
                    .style("stroke-width", "1.5px");
            }
        }

        return div;
    }

    updateChart() {
        const { data, settings } = this.props,
            {variables} = settings;

        let width = this.state.width,
                height = this.state.height;

            this.svg
                .attr("width", "100%")
                .attr("height", height + margin.top + margin.bottom);

            // console.log(data, variables);

            this.x.range([0, width]);
            this.y.range([height, 0]);

            const getLine = (dataObject) => {
              let line = d3.line()
                .x(d => {return this.x(d); })
                .y(d => {return this.y(dataObject[d]); });

              return line(Object.keys(dataObject));
            }

            this.xAxis
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(this.x));

            this.yAxis
                .call(d3.axisLeft(this.y));

            for (let varName in this.dataLines) {
                this.dataLines[varName].path
                    .attr("d", getLine(data[varName]));

                for (let key in this.dataLines[varName].circles) {
                    this.dataLines[varName].circles[key]
                        .attr("cx", this.x(key))
                        .attr("cy", this.y(data[varName][key]))
                }
            }
            
        
        // let dataGroup = g.selectAll(".dataGroup")
        //   .data(data)
        //   .enter().append("g")
        //   .attr("class", "dataGroup");

        // dataGroup.append("path")
        //     .attr("class", "line")
        //     .attr("d", function(d) { console.log(d) })
            // .style("stroke", function(d) { return z(d.id); });

        // city.append("text")
        //     .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        //     .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
        //     .attr("x", 3)
        //     .attr("dy", "0.35em")
        //     .style("font", "10px sans-serif")
        //     .text(function(d) { return d.id; });
    }

}