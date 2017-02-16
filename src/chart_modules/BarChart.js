var d3 = require("d3");

export default class BarChart {
	constructor(settings) {
		console.log(settings);
		let {data, variables, domElem, mouseoverFunc, mouseoutFunc} = settings;
    console.log(data);
		this.data = data;
		this.variables = variables;
		this.domElem = domElem;
		this.mouseoverFunc = mouseoverFunc;
		this.mouseoutFunc = mouseoutFunc;

		this.initializeDataBars();
	}

	initializeDataBars() {
		this.dataBars = {};
        
         let dataArray;
		for (let variable of this.variables) {
			let varName = variable.variable;

            dataArray = Object.keys(this.data[varName]).map(
            	(key) => {
            		let year = key,
            			value = this.data[varName][key];
            		return {year: year, value: value};
				}
			)

            this.dataBars[varName] = this.domElem.selectAll("rect#" + varName)
            	.data(dataArray)
              .enter().append("rect")
              	.attr("id", (d) => { console.log(d); return varName; })
              	.attr("class", "bar-chart__data-bar")
                .style("fill", variable.color)
                .style("stroke", "white")
                .style("stroke-width", "1px")
                .on("mouseover", (d, index, paths) => { return this.mouseoverFunc(d, paths[index], d3.event, varName); })
                .on("mouseout", () => this.mouseoutFunc());
        }
    }

    update(updateParams) {
        const {width, height} = updateParams;
 		this.updateDataBars(updateParams);
    }

    updateDataBars(updateParams) {
        const {y, x, width, height, currHovered, valsShown} = updateParams;

        console.log(valsShown);

        let barHeights = {};
        for (let year of x.domain()) {
            barHeights[year] = height;
        }

        for (let variable of this.variables) {
         let varName = variable.variable;

            this.dataBars[varName]
                .attr("x", (d) => { return x(d.year); })
                .attr("y", (d) => {
                    barHeights[d.year] -= (height - y(d.value));
                    return barHeights[d.year];
                })
                .attr("height", (d) => { return height - y(d.value); })
                .attr("width", x.bandwidth())
                .attr("opacity", (d) => {
                     if (currHovered) {
                         if (varName == currHovered.varName && d.year == currHovered.year) {
                             return .7;
                         }
                     } 
                     return 1;
                })
                .classed("disabled", valsShown.indexOf(varName) == -1)
        }
    }
}