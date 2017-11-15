import React from 'react';
import { connect } from 'react-redux';

import {formatValue} from '../../helper_functions/format_value'
import {isFiftyState} from '../../helper_functions/is_fifty_state'
import {fetchRanking} from '../../actions.js'

const getOrdinal = (n) => {
    var s=["th","st","nd","rd"],
    v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
}

const sectorOptions = {
  "all": "",
  "public2": "(2-Year Public)",
  "public4": "(4-Year Public)",
  "nonprofit": "(Private Nonprofit)",
  "forprofit": "(Private For-Profit)",
}

class DataBlockCallout extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
    	this.fetchNewRankings(this.props);
    }

    componentWillReceiveProps(nextProps) {
    	// if (nextProps.sector != this.props.sector) {
    	// 	this.fetchNewRankings(nextProps)
    	// }
    }

    fetchNewRankings(propsObject) {
    	const {collectionName, settings, maxYear, data, sector} = propsObject;
		const {type, direction, variables} = settings;
    	{variables.map((variable) => {
      		if (type == "ranking" && isFiftyState(data.state) && data[variable.variable] && data[variable.variable][maxYear]) {
                let value;

                if (sector) {
	                Object.keys(sectorOptions).forEach(sectorKey => {
	                	let collection = collectionName + "_" + sectorKey
						let rankingKey = collection + "_" + sectorKey + "_" + data.path + "_" + variable.variable;

						if (!this.props.fetchedRankings[rankingKey] && !this.props.fetchedRankings[rankingKey] != "fetching") {
							this.sendRankCalloutRequest(data, collection, variable, direction)
						}
					})
				} else {
					let rankingKey = collectionName + "_" + data.path + "_" + variable.variable;

					if (!this.props.fetchedRankings[rankingKey] && !this.props.fetchedRankings[rankingKey] != "fetching") {
						this.sendRankCalloutRequest(data, collectionName, variable, direction)
					}
				}
	      	} 
	      	return null; 	
      	})}
    }

    getValueCallout(data, variable) {
		const {collectionName, maxYear} = this.props;
	    
	    let value = data[variable.variable][maxYear];

	    if (isNaN(value)) { return null; }

	    if (variable.format == "number" || variable.format == "price") {
	          if (value >= 1000000000) {
	                value = Math.round(value/10000000)/100 + "B"
	          } else if (value >= 1000000) {
	                value = Math.round(value/100000)/10 + "M"
	          } else if (value >= 1000) {
	                value = Math.round(value/1000) + "K"
	          } else {
	          	value = Math.round(value)
	          }
	    } else {
	          value = formatValue(value, variable.format)
	    }

	    value = variable.format == "price" ? "$" + value : value;

	    return value;
	}

    sendRankCalloutRequest(data, collection, variable, direction) {
        const {collectionName, maxYear, sector} = this.props;

        this.props.fetchRanking(collection, direction, variable.variable, maxYear, data[variable.variable][maxYear], data.path)
    }

    render() {
	    const {collectionName, settings, maxYear, data, sector} = this.props;
		const {type, direction, variables} = settings;

		if (!data) { return null; }

	    return (
	          <div className={"data-block__callout-container children-" + variables.length}>
	          	{variables.map((variable) => {
	          		if (data[variable.variable] && data[variable.variable][maxYear]) {
                        let value;
                        if (type == "value") {
      			      		value = this.getValueCallout(data, variable);
                        } else {
							let collection = sector ? collectionName + "_" + sector : collectionName
                
							let rankingKey = collection + "_" + data.path + "_" + variable.variable;

							if (this.props.fetchedRankings[rankingKey]) {
								value = this.props.fetchedRankings[rankingKey];
								if (isNaN(value)) { return null; }
								value = getOrdinal(value);
							} else if (this.props.fetchedRankings[rankingKey] == "fetching") {
								value = "Loading..."
							}
                        }

                        if (value) {
		    	      		return (
		    	      			<div className="data-block__callout" key={variable.variable}>
		    	      				<h5 className="data-block__callout__value">{value}</h5>
		    	      				<h5 className="data-block__callout__label">{variable.displayName.replace("@sector", sectorOptions[sector])}</h5>
		    	      			</div>
		    	      		)
		    	      	}
	    	      	} 
	    	      	
	    	      	return null;
	    	      	
	          	})}
	          	
	          </div>
	  	)
	}
}

const mapStateToProps = (state) => {
  return {
    fetchedRankings: state.fetchedRankings
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    fetchRanking: (collection, direction, variable, year, value, profilePath) => {
      dispatch(fetchRanking(collection, direction, variable, year, value, profilePath))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataBlockCallout);