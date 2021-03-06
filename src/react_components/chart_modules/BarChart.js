const d3 = require("d3");

export default class BarChart {
	constructor(settings) {
		Object.assign(this, settings)

		this.initializeDataBars();
	}

	initializeDataBars() {
		this.dataBars = {};
        
		for (let variable of this.variables) {
      let dataArray = [];
			let varName = variable.variable;
      Object.keys(this.data[varName]).forEach(
      	(key) => {
      		let year = key,
      			value = this.data[varName][key];

          if (!isNaN(value)) {
      		  dataArray.push({year: year, value: value});
          }
				}
			)

      this.dataBars[varName] = this.domElem.selectAll("rect#" + varName)
      	.data(dataArray)
        .enter().append("rect")
        	.attr("id", (d) => { return varName; })
        	.attr("class", "bar-chart__data-bar")
          .style("fill", variable.color)
          .style("stroke", "white")
          .style("stroke-width", "1px")
          .on("mouseover", (d, index, paths) => {
            return this.mouseoverFunc(d.year, d3.event); 
          })
          .on("mouseout", () => this.mouseoutFunc());
    }
  }

    update(updateParams) {
      const {width, height} = updateParams;
 		  this.updateDataBars(updateParams);
    }

    updateDataBars(updateParams) {
        const {y, x, width, height, currHovered, valsShown} = updateParams;

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
                     if (currHovered && d.year == currHovered) {
                             return .7;
                     } 
                     return 1;
                })
                .classed("disabled", valsShown.indexOf(varName) == -1)
        }
    }

    getValArray(year) {
      let valArray = [];
      for (let variable of this.variables) {
        valArray.push({ variable: variable, value: this.data[variable.variable][year] });
      }
      return valArray;
    }
}