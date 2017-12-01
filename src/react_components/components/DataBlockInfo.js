import React from 'react';
const d3 = require("d3");
import { Link } from 'react-router';

import {formatValue} from '../../helper_functions/format_value';
import DataBlockCallout from "./DataBlockCallout";
import DataBlockParagraph from "./DataBlockParagraph";

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
	const {settings, data, collectionName, sector, sectorOptions} = props,
		{paragraphSettings, calloutSettings, source, indicatorLink, usesCongressionalDistrictAggregate} = settings;

	if (!data) { return null; }

	console.log(sectorOptions, sector)

	let sectorLabel = sectorOptions ? sectorOptions[sector].toLowerCase() : null
	sectorLabel = sectorLabel === "all sectors" ? "" : sectorLabel;

	const maxYear = getMaxYear(paragraphSettings.variables, data);
    return (
      <div className="data-block__info">
      	{ calloutSettings && maxYear != 0 && <DataBlockCallout settings={calloutSettings} maxYear={maxYear} data={data} collectionName={collectionName} sectorOptions={sectorOptions}  sector={sector}/> }
      	{ (paragraphSettings.usesCongressionalDistrictAggregate || maxYear != 0) && <DataBlockParagraph settings={paragraphSettings} maxYear={maxYear} data={data} sectorLabel={sectorLabel}/> }
      	{ source && maxYear != 0 && <div className="data-block__source">Source: {source}</div> }
      	{ indicatorLink && <Link to={"/indicator/" + indicatorLink}><div className="data-block__indicator-link">Learn More</div></Link> }
      </div>
    )
}