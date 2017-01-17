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

		this.initializeXScale();
		this.initializeDataBars();

        this.xAxis = this.domElem.append("g")
            .attr("class", "axis axis--x");

	}

	initializeXScale() {
        this.x = d3.scaleBand()
            .paddingInner(0.3)
            .paddingOuter(0.4);

        let keyList = [];

        for (let variable of this.variables) {
            let keys = Object.keys(this.data[variable.variable]);
            keyList.push(...keys);
        }

        keyList = Array.from(new Set(keyList));

        this.x.domain(keyList);
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
 		this.updateXScale(updateParams);
 		this.updateDataBars(updateParams);

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

    updateXScale(updateParams) {
    	const {width, height} = updateParams;

        this.x.rangeRound([0, width]);
        
    }

    updateDataBars(updateParams) {
        const {y, width, height, currHovered, valsShown} = updateParams;

        console.log(currHovered);

        let barHeights = {};
        for (let year of this.x.domain()) {
            barHeights[year] = height;
        }

        for (let variable of this.variables) {
         let varName = variable.variable;

            this.dataBars[varName]
                .attr("x", (d) => { return this.x(d.year); })
                .attr("y", (d) => {
                    barHeights[d.year] -= (height - y(d.value));
                    return barHeights[d.year];
                })
                .attr("height", (d) => { return height - y(d.value); })
                .attr("width", this.x.bandwidth())
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