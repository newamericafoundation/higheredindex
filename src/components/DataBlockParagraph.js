import React from 'react';
var d3 = require("d3");

export default function DataBlockParagraph(props) {
	const {settings, data} = props,
		{textSections, variables} = settings;
	console.log(textSections, variables, data);
  	
  	let populatedText = [];

	textSections.map((text, i) => {
		let variable = variables[i],
			variableClass = variable == 'name' ? '' : "data-block__paragraph__data";
			
		populatedText.push(<span> {text} </span>);

		if (typeof(data[variable]) == 'object') {
			let keys = Object.keys(data[variable]);
			let maxYear = d3.max(keys, (d) => { return Number(d) });

			populatedText.push(<span className={variableClass}>{data[variable][maxYear]}</span>);
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