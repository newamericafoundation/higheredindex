import React from 'react';
const d3 = require("d3");
import {formatValue} from '../helper_functions/format_value';

export default function DataBlockParagraph(props) {
	const {settings, maxYear, data} = props,
		{textSections, variables} = settings;

  	let fullText = []

  	if (textSections.length == 0 || variables.length == 0) {
  		return (<div className="data-block__paragraph"></div>);
  	}

  	let variableCounter = 0;
  	console.log(settings)
  	textSections.forEach((section, i) => {
  		if (section) {
	  		console.log(section)
	  		let textSection = [];
			section.map((text, j) => {
				let variable = variables[variableCounter];
				text = text.replace("@year", maxYear);
				
				textSection.push(<span>{text}</span>);

				console.log(variable)

				if (variable) {
					if (variable.linkText) {
						textSection.push(<a className="data-block__paragraph__link" href={variable.linkUrl}>{variable.linkText}</a>)
					} else {
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
				}
				variableCounter++;
		    })
		    fullText.push(<p>{textSection}</p>)
		}
	});

    return (
      <div className="data-block__paragraph">
      	<div className="data-block__paragraph__text">
      		{fullText}
      	</div>
      </div>
    )
}