import React from 'react';
var d3 = require("d3");

export default function Tooltip(props) {
	console.log(props);
	let styleObject;
	if (props.settings) {
		styleObject = {
			display: "block",
			left: props.settings.x + "px",
			top: props.settings.y + "px"
		};
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
				<h5 className="tooltip__value">{props.settings.value}</h5>
			</div>
		}
		</div>
	)
}