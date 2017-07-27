import React from 'react';
var d3 = require("d3");
import {formatValue} from '../helper_functions/format_value';
import DataBlockCallout from "./DataBlockCallout";

function getMaxYear(variables, data) {
	let totalMaxYear = 0;
	for (let variable of variables) {
		let varName = variable.variable;
		if (data[varName] && typeof(data[varName]) == 'object') {
			let keys = Object.keys(data[varName]);
			let localMaxYear = d3.max(keys, (d) => { return Number(d) });
			totalMaxYear = Math.max(localMaxYear, totalMaxYear);
		}
	}

	return totalMaxYear;
}


export default function DataBlockParagraph(props) {
	const {settings, calloutSettings, data, collectionName} = props,
		{textSections, variables} = settings;

	if (!data) { return null; }
  	
  	
  	let fullText = [],
  		maxYear = getMaxYear(variables, data);

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
      	{ calloutSettings && <DataBlockCallout settings={calloutSettings} maxYear={maxYear} data={data} collectionName={collectionName}/> }
      	<div className="data-block__paragraph__text">
      		{fullText}
      	</div>
      </div>
    )
}