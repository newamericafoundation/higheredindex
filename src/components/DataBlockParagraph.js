import React from 'react';
var d3 = require("d3");

function getMaxYear(variables, data) {
	let totalMaxYear = 0;
	for (let variable of variables) {
		if (typeof(data[variable]) == 'object') {
			let keys = Object.keys(data[variable]);
			let localMaxYear = d3.max(keys, (d) => { return Number(d) });
			totalMaxYear = localMaxYear > totalMaxYear ? localMaxYear : totalMaxYear;
		}
	}

	return totalMaxYear;
}


export default function DataBlockParagraph(props) {
	const {settings, data} = props,
		{textSections, variables} = settings;
	console.log(textSections, variables, data);
  	
  	let populatedText = [],
  		totalMaxYear = getMaxYear(variables, data);

	textSections.map((text, i) => {
		let variable = variables[i],
			variableClass = variable == 'name' ? '' : "data-block__paragraph__data";
		text = text.replace("@year", totalMaxYear);
		populatedText.push(<span>{text}</span>);

		if (typeof(data[variable]) == 'object') {
			let keys = Object.keys(data[variable]);
			let localMaxYear = d3.max(keys, (d) => { return Number(d) });
			populatedText.push(<span className={variableClass}>{data[variable][localMaxYear]}</span>);
		} else {
			populatedText.push(<span className={variableClass}>{data[variable]}</span>);
		}
    })

    console.log(populatedText);
    return (
      <div className="data-block__paragraph">
      	<p>{populatedText}</p>
      </div>
    )
}