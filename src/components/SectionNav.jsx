'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { connect } from 'react-redux'

import SvgIcon from './SvgIcon'
import sectionSettings from '../settings/sectionSettings.js';

import { changeCurrProfileSection } from '../actions';

class SectionNav extends React.Component {
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
		let sectionNavTop = $(this.refs.section_nav).offset().top,
	    	sectionNavPlaceholderTop = $(this.refs.section_nav_position_placeholder).offset().top;

	    if (!this.state.fixed && sectionNavTop <= 70) {
	    	this.setState({
	    		fixed: true
	    	})
	    } 

	    if (this.state.fixed && sectionNavPlaceholderTop >= 70) {
	    	this.setState({
	    		fixed: false
	    	})
	    }         
	}

	handleClick(section, i) {
		$(".app-container").animate(
        	{'scrollTop':$("#" + section).offset().top + $(".app-container").scrollTop()},
        	500,
        	() => {
        		location.href = "#" + section;
				this.props.changeCurrSection(String(i))
        	}
        );
		
	}

	render() {
		let sections;
		console.log(this.props.type)
		if (this.props.type == "indicator") {
			sections = ["about", "rankings", "trends"];
		} else {
			sections = sectionSettings[this.props.type];
		}

		let sectionNavClass = "section-nav";
		sectionNavClass += this.state.fixed ? " fixed" : "";

		let sectionNavPlaceholderClass = "section-nav__placeholder";
		sectionNavPlaceholderClass += this.state.fixed ? " fixed" : "";

		return (
			<div>
				<div ref="section_nav_position_placeholder" className={sectionNavPlaceholderClass} />
		    	<div ref="section_nav" className={sectionNavClass}>
		    		<div className="section-nav__items">
		    		{sections.map((section, i) => {
		    			let classList = "section-nav__item";
		    			classList += this.props.currProfileSection == i ? " selected" : "";
		    			return (
							<div className={classList} key={i} onClick={() => { return this.handleClick(section.name.toLowerCase(), i); }}>
								<SvgIcon name={section.dataDivision} />
								<h3 className="section-nav__item__text">{section.name}</h3>
							</div>
						)
		    		})}
		    		</div>
		    	</div>
		    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionNav)

