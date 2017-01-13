var d3 = require("d3");

export default class LineChart {
	constructor(settings) {
		console.log(settings);
		let {data, variables, domElem} = settings;

		this.data = data;
		this.variables = variables;
		this.domElem = domElem;

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
			console.log(varName);
			this.dataLines[varName] = this.domElem.append("path")
                .attr("class", "line-chart__data-line")
                .style("fill", "none")
                .style("stroke", "black")
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
                .attr("r", (d) => { console.log(d); return 4})
                .style("stroke", "black")
                .attr("id", varName)
                .attr("class", "line-chart__data-circle")
                .style("stroke-width", "1.5px");
		}

		console.log(this.dataCircles);
    }

    update(updateParams) {
    	// const {y, width, height} = updateParams;
    	console.log(updateParams);

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
        const {y, width, height} = updateParams;

        const getLine = (dataObject) => {
          let line = d3.line()
            .x(d => {return this.x(d); })
            .y(d => {return y(dataObject[d]); });

          return line(Object.keys(dataObject));
        }

        for (let variable of this.variables) {
        	let varName = variable.variable;
				this.dataLines[varName]
                	.attr("d", getLine(this.data[varName]));

                this.dataCircles[varName]
                	.attr("cx", (d) => { console.log(d); return this.x(d.year)})
                	.attr("cy", (d) => { console.log(d); return y(d.value)})
        }
    }
}