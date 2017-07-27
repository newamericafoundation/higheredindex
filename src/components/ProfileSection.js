'use strict';

import React from 'react';
import { connect } from 'react-redux'
import DataBlock from './DataBlock';
let d3 = require("d3")

import $ from 'jquery';

import SvgIcon from './SvgIcon';
import RankingsDashboard from '../chart_modules/RankingsDashboard';

import { changeCurrProfileSection } from '../actions';

class ProfileSection extends React.Component {
	constructor() {
		super()
		this.state = {
			fixed: false
		}

		this.handlerFunc = this.handleScroll.bind(this);
	}
	componentDidMount() {
	    $(".app-container").scroll(this.handlerFunc);
	}

	componentWillUnmount() {
	    $(".app-container").off("scroll", this.handlerFunc);
	}

	handleScroll(event) {
	    let sectionCoords = this.refs.profile_section.getBoundingClientRect();

	    if (this.props.currProfileSection != this.props.index && sectionCoords.top < 140 && sectionCoords.bottom > 140) {
	    	this.props.changeCurrSection(this.props.index);
	    }  
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.dataInfo && nextProps.dataInfo && this.dataInfo.length != nextProps.dataInfo.length) {
			return true;
		}
		return false;
	}

	getSectionContent() {
		const {type, data, settings, description, collectionName} = this.props;

		switch(type) {
			case "description":
				return (
			        <div className="location-profile__body-paragraph">
			          <p>{ description }</p>
			        </div>
				)
			case "rankingDashboard":
				return (
			        <div>
			        	{settings && <RankingsDashboard filters={settings} />}
			        </div>
				)
			default:
				return (
					<div>
			          {settings.map((settingsObject, i) => {
			            return <DataBlock key={i} settings={settingsObject} data={data} collectionName={collectionName} />;
			          })}
			        </div>
				)
		}
			
	}

	getLastUpdated(dataInfo, collectionName) {
		let retVal = null;
		dataInfo.forEach((d) => {
			if (d.collection === collectionName) {
				if (d.last_updated) {
					retVal = d3.timeFormat("%B %d, %Y - %I:%M %p")(new Date(d.last_updated));
					console.log(retVal)
				}
				return;
			}
		})
		return retVal;
	}

	render() {
		const {title, subtitle, data, settings, collectionName, dataInfo} = this.props;

		let lastUpdated = dataInfo && collectionName ? this.getLastUpdated(dataInfo, collectionName) : null;
		
		let sectionContent = this.getSectionContent();
		return (
	    	<section ref="profile_section" className="profile-section" >
	    		<a className="profile-section__anchor" id={title.toLowerCase()} name={title.toLowerCase()} />
	    		<div className="profile-section__title-container">
	    			<h3 className="profile-section__title">{title}</h3>
	    			<p>
		    			{ subtitle && <span className="profile-section__subtitle">{subtitle}</span>}
		    			{ lastUpdated && <span className="profile-section__last-updated">{" Last updated: " + lastUpdated}</span>}
	    			</p>
	    		</div>
	    		{sectionContent}
	    	</section>
	    );
	}
}

const mapStateToProps = (state) => {
	return {
		currProfileSection: state.currProfileSection,
		dataInfo: state.dataInfo
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrSection: (newIndex) => {
      dispatch(changeCurrProfileSection(newIndex));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection)

