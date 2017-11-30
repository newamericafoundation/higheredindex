const d3 = require("d3");

export default class GroupedBarChart {
    constructor(settings) {
      Object.assign(this, settings)

      this.numVars = this.variables.length;

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
      this.updateDataBars(updateParams);
    }

    updateDataBars(updateParams) {
      const {y, x, width, height, currHovered, valsShown} = updateParams;

      let i = 0;
      for (let variable of this.variables) {
        let varName = variable.variable;

        this.dataBars[varName]
          .attr("x", (d) => { return x(d.year) + i*(x.bandwidth()/this.numVars); })
          .attr("y", (d) => { return y(d.value); })
          .attr("height", (d) => { return height - y(d.value); })
          .attr("width", x.bandwidth()/this.numVars)
          .attr("opacity", (d) => {
            if (currHovered && d.year == currHovered) {
              return .7;
            }
            return 1;
          })
          .classed("disabled", valsShown.indexOf(varName) == -1)

        i++;
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