var d3 = require("d3");

export default class LineChart {
	constructor(settings) {
		console.log(settings);
		let {data, variables, domElem, mouseoverFunc, mouseoutFunc} = settings;

		this.data = data;
		this.variables = variables;
		this.domElem = domElem;
		this.mouseoverFunc = mouseoverFunc;
		this.mouseoutFunc = mouseoutFunc;

		this.initializeXAxis();
		this.initializeDataLines();
	}

	initializeXAxis() {
		this.xAxis = this.domElem.append("g")
            .attr("class", "axis axis--x");

        this.x = d3.scaleLinear();

        let keyList = [];

        for (let variable of this.variables) {
            let keys = Object.keys(this.data[variable.variable]);
            keyList.push(...keys);
        }
        // de-duplication
        keyList = Array.from(new Set(keyList));

        let xExtents = d3.extent(keyList)
        this.x.domain([Number(xExtents[0]) - .15 , Number(xExtents[1]) + .15]);
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
            		return {year: year, value: value};
				}
			)

            this.dataCircles[varName] = this.domElem.selectAll("circle#" + varName)
            	.data(dataArray)
              .enter().append("circle")
              	.attr("id", varName)
              	.attr("class", "line-chart__data-circle")
                .attr("r", 4)
                .style("stroke", variable.color)
                .style("stroke-width", "1.5px")
                .on("mouseover", (d, index, paths) => { return this.mouseoverFunc(d, paths[index], d3.event, varName); })
                .on("mouseout", () => this.mouseoutFunc());
		}
    }

    update(updateParams) {

 		this.updateXAxis(updateParams);
 		this.updateDataLines(updateParams);
    }

    updateXAxis(updateParams) {
    	const {width, height} = updateParams;

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

        this.x.range([0, width]);
    }

    updateDataLines(updateParams) {
        const {y, width, height, currHovered, valsShown} = updateParams;

        const getLine = (dataObject) => {
          let line = d3.line()
            .x(d => {return this.x(d); })
            .y(d => {return y(dataObject[d]); });

          return line(Object.keys(dataObject));
        }

        for (let variable of this.variables) {
        	let varName = variable.variable;
				this.dataLines[varName]
                	.attr("d", getLine(this.data[varName]))
                	.classed("disabled", valsShown.indexOf(varName) == -1)

                this.dataCircles[varName]
                	.attr("cx", (d) => { return this.x(d.year)})
                	.attr("cy", (d) => { return y(d.value)})
                	.classed("disabled", valsShown.indexOf(varName) == -1)
                	.attr("fill", (d) => {
                		if (currHovered) {
                			if (varName == currHovered.varName && d.year == currHovered.year) {
                				return variable.color;
                			}
                		} 
                		return "white";
                	})
        }
        if (currHovered && currHovered.component) {
	        d3.select(currHovered.component)
	        	.attr("fill", "green")
	    }
    }
}