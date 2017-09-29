import React from 'react';
var d3 = require("d3");
import { formatValue, roundLegendAxisVal } from "../helper_functions/format_value.js";

export default class LegendQuantize extends React.Component {
	constructor(props) {
		super(props);

		console.log("in legend quantize!");

		this.fullValList = Array.from(Array(props.filter.numBins).keys());
	}

	toggleVals(valToggled) {
		const {valsShown} = this.props;
		const {numBins} = this.props.filter;
		let newValsShownList = [];

		if (valsShown.length == numBins) {
			newValsShownList.push(valToggled);
		} else {
			let index = valsShown.indexOf(valToggled);
			newValsShownList = valsShown;

			if (index > -1) {
				newValsShownList.splice(index, 1);
			} else {
				newValsShownList.push(valToggled);
			}
		}

		// if none toggled, show all values
		if (newValsShownList.length == 0) {
			newValsShownList = this.fullValList;
		}

		this.props.toggleChartVals(newValsShownList);
	}

	renderCells() {
		const {colorScale, filter, toggleChartVals, valsShown} = this.props;
		const {numBins, format} = filter;

		let [dataMin, dataMax] = colorScale.domain();
		let dataSpread = dataMax - dataMin;
		let binInterval = dataSpread/numBins;

		let cells = [];
		let currCell, cellText, classes;

		for(let i = 0; i < numBins; i++) {
			if (format == "percent") {
				cellText = formatValue(Math.ceil(100*this.calcBinVal(i, dataMin, binInterval))/100, format) + " to " + formatValue(Math.floor(100*this.calcBinVal(i+1, dataMin, binInterval))/100, format);
			} else {
				let min = roundLegendAxisVal(Math.ceil(this.calcBinVal(i, dataMin, binInterval)), format),
					max = roundLegendAxisVal(Math.floor(this.calcBinVal(i+1, dataMin, binInterval)), format);
				
				cellText = min + " to " + max;
			}

			classes="legend__cell";
			classes += valsShown.indexOf(i) > -1 ? "" : " disabled";
			currCell = (
		      	<li key={i} className={classes} onClick={() => this.toggleVals(i)}>
		      		<svg height="8" width="8" className="legend__cell__color-swatch-container">
		      			<circle fill={colorScale.range()[i]} cx="4" cy="4" r="4" className="legend__cell__color-swatch"></circle>
		      		</svg>
		      		<h5 className="legend__cell__label">{cellText}</h5>
		      	</li>
			);
			cells.push(currCell);
		}

		return cells;
	}

	calcBinVal(i, dataMin, binInterval) {
		let binVal = dataMin + (binInterval * i);
		return Math.round(binVal * 100)/100;
	}

	render() {
		const {colorScale, filter, toggleVals} = this.props;
		const {numBins} = filter;

		return (
			<div className="legend map-legend">
				<ul className="legend__cell-list">
					{this.renderCells()}
				</ul>
			</div>
		)
	}
}