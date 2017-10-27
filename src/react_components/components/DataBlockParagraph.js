import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
const $ = require("jquery")
const d3 = require("d3");

import {formatValue} from '../../helper_functions/format_value';
import SvgIcon from './SvgIcon'

class DataBlockParagraph extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            congressionalDistrictAggregate: null
        }
	}

	componentDidUpdate(prevProps, prevState) {
		const {settings, maxYear, data, fetchedCongDistrictInfo} = this.props;
        
        if (prevProps.data.state !== data.state) {
        	if (fetchedCongDistrictInfo[data.state] && fetchedCongDistrictInfo[data.state] != "fetching") {
	            this.districtCounts = fetchedCongDistrictInfo[data.state];

	     		let average = d3.sum(this.districtCounts, (d) => { return d.count})/this.districtCounts.length;
	            
	            this.setState({
	                congressionalDistrictAggregate: Math.round(average*100)/100
	            })
	        }
        }
    }

    explainerMouseOver(index) {
    	let popup = $(this.refs["explainer-popup_" + index]);
    	let hoverText = $(this.refs["explainer-text_" + index]);

    	popup.css("top", hoverText[0].offsetTop + 25)
    	popup.removeClass("hidden");
    }

    explainerMouseOut(index) {
    	$(this.refs["explainer-popup_" + index]).addClass("hidden");
    }

	render() {
		const {settings, maxYear, data} = this.props,
			{textSections, variables} = settings;

		if (data) {
		  	let fullText = []
	  		let explainerPopups = [];

		  	if (textSections.length == 0 || variables.length == 0) {
		  		return (<div className="data-block__paragraph"></div>);
		  	}

		  	let variableCounter = 0;
		  	textSections.forEach((section, i) => {
		  		if (section) {
			  		let textSection = [];
					section.map((text, j) => {
						let variable = variables[variableCounter];
						text = text.replace("@year", maxYear);
						
						textSection.push(<span key={j + "_text"} >{text}</span>);

						if (variable) {
							if (variable.linkText) {
								textSection.push(
									<Link key={j} to={variable.linkUrl}><span className="data-block__paragraph__link">{variable.linkText}</span></Link>
								)
							} else if (variable.congressionalDistrictAggregate) {
								textSection.push(<span className="data-block__paragraph__data" key={j}>{this.state.congressionalDistrictAggregate}</span>)
							} else if (variable.explainerText) {
								let explainerIndex = explainerPopups.length
								textSection.push(<div className="data-block__paragraph__explainer" ref={"explainer-text_" + explainerIndex} key={j} onMouseOver={() => { return this.explainerMouseOver(explainerIndex)}} onMouseOut={() => { return this.explainerMouseOut(explainerIndex)}}><SvgIcon name="question" /></div>)
								explainerPopups.push(<div className="data-block__paragraph__explainer-popup hidden" ref={"explainer-popup_" + explainerIndex}>{variable.explainerText}</div>)
							} else if (variable.variable) {
							 	if (data[variable.variable]) {
							 		let value;
									let varName = variable.variable,
										variableClass = varName == 'name' ? '' : "data-block__paragraph__data";

									if (typeof(data[varName]) == 'object') {
										value = data[varName][maxYear];
									} else {
										value = data[varName];
									}

									value = value === 0 || (value && value != "NA" && value != NaN) ? formatValue(value, variable.format) : "N/A";	
									textSection.push(<span className={variableClass} key={j}>{value}</span>);

								} else {
									textSection.push(<span className="data-block__paragraph__data" key={j}>N/A</span>);
								}
							} 
						}
						variableCounter++;
				    })
				    fullText.push(<p key={i} >{textSection}</p>)
				}
			});

		    return (
		      <div className="data-block__paragraph">
		      	<div className="data-block__paragraph__text">
		      		{fullText}
		      	</div>
		      	{explainerPopups}
		      </div>
		    )
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => {
  return {
    fetchedCongDistrictInfo: state.fetchedCongDistrictInfo
  }
}

export default connect(mapStateToProps)(DataBlockParagraph)
