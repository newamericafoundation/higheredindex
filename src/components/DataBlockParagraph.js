import React from 'react';
var d3 = require("d3");
import {formatValue} from '../helper_functions/format_value';

export default function DataBlockParagraph(props) {
	const {settings, maxYear, data} = props,
		{textSections, variables} = settings;

  	let fullText = []

  	if (textSections.length == 0 || variables.length == 0) {
  		return (<div className="data-block__paragraph"></div>);
  	}

  	let variableCounter = 0;
  	textSections.forEach((section, i) => {
  		let textSection = [];
		section.map((text, j) => {
			let variable = variables[variableCounter];
			text = text.replace("@year", maxYear);
			textSection.push(<span>{text}</span>);

			if (variable) {
			 	if (data[variable.variable]) {
			 		let value;
					let varName = variable.variable,
						variableClass = varName == 'name' ? '' : "data-block__paragraph__data";

					if (typeof(data[varName]) == 'object') {
						value = data[varName][maxYear];
					} else {
						value = data[varName];
					}
					
					value = value ? formatValue(value, variable.format) : "N/A";	
					textSection.push(<span className={variableClass} key={j}>{value}</span>);

				} else {
					textSection.push(<span className="data-block__paragraph__data" key={j}>N/A</span>);
				}
			}
			variableCounter++;
	    })
	    fullText.push(<p>{textSection}</p>)
	});

    return (
      <div className="data-block__paragraph">
      	<div className="data-block__paragraph__text">
      		{fullText}
      	</div>
      </div>
    )
}