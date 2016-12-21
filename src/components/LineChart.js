import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
var d3 = require("d3");
import $ from 'jquery';

export default class LineChart extends React.Component {
    render() {
        const { data, settings } = this.props,
            {variables} = settings;

        console.log(data, variables);
        const div = new ReactFauxDOM.Element('div');

        var svg = d3.select(div).append("svg").attr("height",300).attr("width",'100%'),
            margin = {top: 10, right: 80, bottom: 30, left: 30},
            width = 1000 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            z = d3.scaleOrdinal(d3.schemeCategory10);

        const getLine = (dataObject) => {
          let line = d3.line()
            .x(d => {console.log(x(d)); return x(d); })
            .y(d => {console.log(y(dataObject[d])); return y(dataObject[d]); });

          return line(Object.keys(dataObject));
        }
        
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
        x.domain(d3.extent(keyList));

        y.domain(d3.extent(valList));

        console.log(y.domain());
        z.domain(variables);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .text("Value");

        for (let variable of variables) {
            let varName = variable.variable
          console.log(data[varName]);
          g.append("path")
            .attr("d", getLine(data[varName]))
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "1.5px");

          for (let key in data[varName]) {
            console.log(key)
            g.append("circle")
            .attr("r", 3)
            .attr("cx", x(key))
            .attr("cy", y(data[varName][key]))
            .style("fill", "white")
            .style("stroke", "steelblue")
            .style("stroke-width", "1.5px");
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

        return div.toReact();
    }

}