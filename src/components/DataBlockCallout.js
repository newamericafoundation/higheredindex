import React from 'react';
import {formatValue} from '../helper_functions/format_value'

const DataBlockCallout = ({settings, maxYear, data}) => {
	const {type, variables} = settings;

	if (!data) { return null; }
  

    return (
      <div className={"data-block__callout-container children-" + variables.length}>
      	{variables.map((variable) => {
      		if (data[variable.variable] && data[variable.variable][maxYear]) {
      			let value = data[variable.variable][maxYear];
      			if (variable.format == "number") {
      				if (value >= 1000000000) {
      					value = Math.round(value/1000000000) + "B"
      				} else if (value >= 1000000) {
      					value = Math.round(value/1000000) + "M"
      				} else if (value >= 1000) {
      					value = Math.round(value/1000) + "K"
      				} 
      			} else {
      				value = formatValue(value, variable.format)
      			}
	      		return (
	      			<div className="data-block__callout">
	      				<h5 className="data-block__callout__value">{value}</h5>
	      				<h5 className="data-block__callout__label">{variable.displayName}</h5>
	      			</div>
	      		)
	      	} else {
	      		return null;
	      	}
      	})}
      	
      </div>
    )
}

export default DataBlockCallout;