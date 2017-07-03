import React from 'react';
var d3 = require("d3");

import { formatValue } from "../helper_functions/format_value.js";

export default function Tooltip(props) {
	console.log(props);
	let styleObject;
	if (props.settings) {
		styleObject = {
			display: "block",
			top: props.settings.y + "px"
		};

		if (props.settings.x < (props.settings.renderingAreaWidth - 200)) {
			styleObject.left = (props.settings.x + 10) + "px";
		} else {
			styleObject.right = (props.settings.renderingAreaWidth - props.settings.x + 10) + "px";
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
				{ props.settings.valArray.map((val) => { return renderVal(val); })}
			</div>
		}
		</div>
	)
}

function renderVal(val) {
	console.log(val);
	if ((val.value || val.value == 0) && !isNaN(val.value)) {
		return (
			<h5 className="tooltip__value" key={val.variable.variable}>
				<span className="tooltip__value__label" style={{color:val.variable.color}}>{ val.variable.displayName }:</span>
				<span className="tooltip__value__val">{ formatValue(val.value, val.variable.format) }</span>
			</h5>
		)
	}
}