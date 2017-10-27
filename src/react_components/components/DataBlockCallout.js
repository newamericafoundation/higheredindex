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

class DataBlockCallout extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
    	const {settings, maxYear, data} = this.props;
		const {type, direction, variables} = settings;

    	{variables.map((variable) => {
      		if (type == "ranking" && isFiftyState(data.state) && data[variable.variable] && data[variable.variable][maxYear]) {
                let value;
                
				let rankingKey = data.path + "_" + variable.variable;

				if (!this.props.fetchedRankings[rankingKey] && !this.props.fetchedRankings[rankingKey] != "fetching") {
					this.sendRankCalloutRequest(data, variable, direction)
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

    sendRankCalloutRequest(data, variable, direction) {
        const {collectionName, maxYear} = this.props;

        this.props.fetchRanking(collectionName == "states_schools" ? "states_schools_all" : collectionName, direction, variable.variable, maxYear, data[variable.variable][maxYear], data.path)
    }

    render() {
	    const {settings, maxYear, data} = this.props;
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
							let rankingKey = data.path + "_" + variable.variable;

							if (this.props.fetchedRankings[rankingKey]) {
								value = this.props.fetchedRankings[rankingKey];
								if (isNaN(value)) { return null; }
								value = getOrdinal(value);
							} else if (this.props.fetchedRankings[rankingKey] == "fetching") {
								value = null
							}
                        }

                        if (value) {
		    	      		return (
		    	      			<div className="data-block__callout" key={variable.variable}>
		    	      				<h5 className="data-block__callout__value">{value}</h5>
		    	      				<h5 className="data-block__callout__label">{variable.displayName}</h5>
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