import React from 'react';
var d3 = require("d3");
import {formatValue} from '../helper_functions/format_value';
import DataBlockCallout from "./DataBlockCallout";
import DataBlockParagraph from "./DataBlockParagraph";
import { Link } from 'react-router';

function getMaxYear(variables, data) {
	let totalMaxYear = 0;

	for (let variable of variables) {
		let varName = variable.variable;
		if (data[varName] && typeof(data[varName]) == 'object') {
			let keys = Object.keys(data[varName]).filter(year => !isNaN(data[varName][year]));
			let localMaxYear = d3.max(keys, (d) => { return Number(d) });
			if (!isNaN(localMaxYear)) {
				totalMaxYear = Math.max(localMaxYear, totalMaxYear);
			}
		}
	}

	return totalMaxYear;
}

export default function DataBlockInfo(props) {
	const {settings, data, collectionName} = props,
		{paragraphSettings, calloutSettings, source, indicatorLink} = settings;

	if (!data) { return null; }

	const maxYear = getMaxYear(paragraphSettings.variables, data);
 	console.log(paragraphSettings, data)
    return (
      <div className="data-block__info">
      	{ calloutSettings && maxYear != 0 && <DataBlockCallout settings={calloutSettings} maxYear={maxYear} data={data} collectionName={collectionName}/> }
      	{ maxYear != 0 && <DataBlockParagraph settings={paragraphSettings} maxYear={maxYear} data={data} /> }
      	{ source && <div className="data-block__source">Source: {source}</div> }
      	{ indicatorLink && <Link to={"/indicator/" + indicatorLink}><div className="data-block__indicator-link">Learn More</div></Link> }
      </div>
    )
}