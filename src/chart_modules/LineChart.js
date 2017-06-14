var d3 = require("d3");

export default class LineChart {
	constructor(settings) {
		let {data, variables, domElem, mouseoverFunc, mouseoutFunc} = settings;

		this.data = data;

		this.variables = variables;
		this.domElem = domElem;
		this.mouseoverFunc = mouseoverFunc;
		this.mouseoutFunc = mouseoutFunc;

        this.hoverLine = this.domElem.append("line")
            .attr("class", "line-chart__hover-line");

		this.initializeDataLines();
	}

	initializeDataLines() {
		this.dataLines = {};
		this.dataCircles = {};

		for (let variable of this.variables) {
			let varName = variable.variable;
			this.dataLines[varName] = this.domElem.append("path")
                .attr("class", "line-chart__data-line")
                .style("fill", "none")
                .style("stroke", variable.color)
                .style("stroke-width", "1.5px");

            let dataArray = Object.keys(this.data[varName]).map(
            	(key) => {
            		let year = key,
            			value = this.data[varName][key];
            		return isNaN(value) ? null : {year: year, value: value};
				}
			)
            dataArray = dataArray.filter((d) => { return d != null; });


            this.dataCircles[varName] = this.domElem.selectAll("circle#" + varName)
            	.data(dataArray)
              .enter().append("circle")
              	.attr("id", varName)
              	.attr("class", "line-chart__data-circle")
                .attr("r", 4)
                .style("stroke", variable.color)
                .style("stroke-width", "1.5px")
                .on("mouseover", (d, index, paths) => {
                  return this.mouseoverFunc(d.year, d3.event); 
                })
                .on("mouseout", () => this.mouseoutFunc());
		}
    }

    update(updateParams) {
    	// const {y, width, height} = updateParams;

 		// this.updateXAxis(updateParams);
 		this.updateDataLines(updateParams);
    }

    updateDataLines(updateParams) {
        const {y, x, width, height, currHovered, valsShown} = updateParams;

        const getLine = (dataObject) => {
          let line = d3.line()
            .x(d => {return x(d) + x.bandwidth()/2; })
            .y(d => {return y(dataObject[d]); });

          return line(Object.keys(dataObject));
        }

        for (let variable of this.variables) {
        	let varName = variable.variable;
				this.dataLines[varName]
                	.attr("d", getLine(this.data[varName]))
                	.classed("disabled", valsShown.indexOf(varName) == -1)

                this.dataCircles[varName]
                	.attr("cx", (d) => { return x(d.year) + x.bandwidth()/2})
                	.attr("cy", (d) => { return y(d.value)})
                	.classed("disabled", valsShown.indexOf(varName) == -1)
                	.attr("fill", (d) => {
                		if (currHovered && d.year == currHovered) {
                			return variable.color;
                		} 
                		return "white";
                	})
        }
        if (currHovered) {
            this.setHoverLine(updateParams);
	    } else {
            this.hoverLine.classed("hidden", true);
        }
    }

    setHoverLine(updateParams) {
        const {y, x, currHovered} = updateParams;

        this.hoverLine
            .classed("hidden", false)
            .attr("x1", x(currHovered) + x.bandwidth()/2)
            .attr("x2", x(currHovered) + x.bandwidth()/2)
            .attr("y1", y.range()[0])
            .attr("y2", y.range()[1])

    }

    getValArray(year) {
      let valArray = [];
      for (let variable of this.variables) {
        valArray.push({ variable: variable, value: this.data[variable.variable][year] });
      }
      return valArray;
    }
}