import React from 'react';
var d3 = require("d3");

function getMaxYear(variables, data) {
	let totalMaxYear = 0;
	for (let variable of variables) {
		if (data[variable] && typeof(data[variable]) == 'object') {
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

	if (!data) { return null; }
  	
  	let populatedText = [],
  		totalMaxYear = getMaxYear(variables, data);

  	if (textSections.length == 0 || variables.length == 0) {
  		return (<div className="data-block__paragraph"></div>);
  	}

	textSections.map((text, i) => {
		let variable = variables[i],
			variableClass = variable == 'name' ? '' : "data-block__paragraph__data";
		text = text.replace("@year", totalMaxYear);
		populatedText.push(<span>{text}</span>);

		if (typeof(data[variable]) == 'object') {
			let keys = Object.keys(data[variable]);
			let localMaxYear = d3.max(keys, (d) => { return Number(d) });
			populatedText.push(<span className={variableClass} key={i}>{data[variable][localMaxYear]}</span>);
		} else {
			populatedText.push(<span className={variableClass} key={i}>{data[variable]}</span>);
		}
    })

    return (
      <div className="data-block__paragraph">
      	<p>{populatedText}</p>
      </div>
    )
}