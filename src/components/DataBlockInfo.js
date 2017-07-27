import React from 'react';
var d3 = require("d3");
import {formatValue} from '../helper_functions/format_value';
import DataBlockCallout from "./DataBlockCallout";
import DataBlockParagraph from "./DataBlockParagraph";

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


export default function DataBlockInfo(props) {
	const {settings, data, collectionName} = props,
		{paragraphSettings, calloutSettings, source, indicatorLink} = settings;

	if (!data) { return null; }

	const maxYear = getMaxYear(paragraphSettings.variables, data);
  	
    return (
      <div className="data-block__info">
      	{ calloutSettings && <DataBlockCallout settings={calloutSettings} maxYear={maxYear} data={data} collectionName={collectionName}/> }
      	<DataBlockParagraph settings={paragraphSettings} maxYear={maxYear} data={data} />
      	
      </div>
    )
}