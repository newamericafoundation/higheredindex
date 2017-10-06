import React from 'react';
var d3 = require("d3");

import { formatValue } from "../helper_functions/format_value.js";

export default function Tooltip(props) {
	let styleObject;
	if (props.settings) {
		styleObject = {
			display: "block",
			top: props.settings.y + "px"
		};

		console.log(props.settings.x, props.settings.renderingAreaWidth)

		if (props.settings.x < (props.settings.renderingAreaWidth - 200)) {
			styleObject.left = (props.settings.x + 10) + "px";
		} else {
			styleObject.right = (props.settings.renderingAreaWidth - props.settings.x - 10) + "px";
		}
	} else {
		styleObject = {
			display: "none"
		};
	}
	return (
		<div className="tooltip" style={styleObject}>
		{ props.settings &&
			<div>
				<h5 className="tooltip__title">{props.settings.title}</h5>
				<div className="tooltip__row-container">
					{ props.settings.valArray.map((val) => { return renderVal(val); })}
				</div>
			</div>
		}
		</div>
	)
}

function renderVal(val) {
	if ((val.value || val.value == 0) && !isNaN(val.value)) {
		return (
			<div className="tooltip__row" key={val.variable.variable}>
				<svg className="tooltip__color-swatch-container">
					<circle className="tooltip__color-swatch" cx="4" cy="4" r="4" style={{fill:val.variable.color}}></circle>
				</svg>
				<h5 className="tooltip__label">{ val.variable.displayName }</h5>
				<h5 className="tooltip__value">{ formatValue(val.value, val.variable.format) }</h5>
			</div>
		)
	}
}