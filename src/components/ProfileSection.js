'use strict';

import React from 'react';
import { connect } from 'react-redux'
import DataBlock from './DataBlock';

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
		return false;
	}

	getSectionContent() {
		const {type, data, settings, description} = this.props;
		
		switch(type) {
			case "description":
				return (
			        <div className="location-profile__body-paragraph">
			          <p>{ description }</p>
			        </div>
				)
			case "rankingDashboard":
				console.log(settings)
				return (
			        <div>
			        	{settings && <RankingsDashboard filters={settings} />}
			        </div>
				)
			default:
				return (
					<div>
			          {settings.map((settingsObject, i) => {
			            return <DataBlock key={i} settings={settingsObject} data={data} />;
			          })}
			        </div>
				)
		}
			
	}

	render() {
		const {title, subtitle, data, settings} = this.props;
		console.log("rendering");

		let sectionContent = this.getSectionContent();
		return (
	    	<section ref="profile_section" className="profile-section">
	    		<a className="profile-section__anchor" name={title.toLowerCase()} />
	    		<div className="profile-section__title-container">
	    			<h3 className="profile-section__title">{title}</h3>
	    			{subtitle && <h5 className="profile-section__subtitle">{subtitle}</h5>}
	    		</div>
	    		{sectionContent}
	    	</section>
	    );
	}
}

const mapStateToProps = (state) => {
	return {
		currProfileSection: state.currProfileSection
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

