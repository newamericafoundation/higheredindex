import React from 'react';
const d3 = require("d3");

export default class LegendCategorical extends React.Component {
	constructor(props) {
		super(props);

		this.numVals = props.variables.length;
		this.fullValList = [];
		for (let variable of props.variables) {
			this.fullValList.push(variable.variable);
		}
		this.state = {
			valsShown: this.fullValList
		};
	}

	toggleVals(valToggled) {
		let {variables} = this.props;
		let {valsShown} = this.state;
		let newValsShownList = [];

		if (valsShown.length == this.numVals) {
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

		this.setState({
			valsShown: newValsShownList
		});
	}

	render() {
		return (
			<div className="legend">
				<ul className="legend__cell-list">
					{this.props.variables.map(variable => {
						let classes = "legend__cell";
						classes += this.state.valsShown.indexOf(variable.variable) > -1 ? "" : " disabled";
			          return (
			          	<li key={variable.variable} className={classes} onClick={() => this.toggleVals(variable.variable)}>
			          		<svg height="8" width="8" className="legend__cell__color-swatch-container">
			          			<circle key={variable.variable} fill={variable.color} cx="4" cy="4" r="4" className="legend__cell__color-swatch"></circle>
			          		</svg>
			          		<h5 className="legend__cell__label">{variable.displayName}</h5>
			          	</li>
			          )
			        })}
				</ul>
			</div>
		)
	}
}