import React from 'react';
import {formatValue} from '../helper_functions/format_value'
import {fetchRanking} from '../actions.js'
import { connect } from 'react-redux';


class DataBlockCallout extends React.Component {
      constructor() {
            super();
      }

      componentWillMount() {

      }

      getValueCallout(data, variable) {
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

            return value;
      }

      sendRankCalloutRequest(data, variable) {
            const {collectionName, maxYear} = this.props;
            console.log(collectionName)
            this.props.fetchRanking(collectionName, variable.variable, maxYear, data[variable.variable][maxYear], data.path)
            console.log("sending rank request")
      }

      render() {
            const {settings, maxYear, data} = this.props;
      	const {type, variables} = settings;

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
                                          console.log(this.props.fetchedRankings)
                                          console.log(rankingKey)
                                          if (this.props.fetchedRankings[rankingKey]) {
                                                value = this.props.fetchedRankings[rankingKey];
                                          } else if (this.props.fetchedRankings[rankingKey] == "fetching") {
                                                value = null
                                          } else {
                                                this.sendRankCalloutRequest(data, variable)
                                          }
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
}

const mapStateToProps = (state) => {
  return {
    fetchedRankings: state.fetchedRankings
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    fetchRanking: (collection, variable, year, value, profilePath) => {
      dispatch(fetchRanking(collection, variable, year, value, profilePath))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataBlockCallout);