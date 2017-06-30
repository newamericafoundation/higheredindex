'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import SvgIcon from './SvgIcon'

export default class SectionNav extends React.Component {
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
		console.log("scrolling")
	    
	    let sectionNavTop = $(this.refs.section_nav).offset().top,
	    	sectionNavPlaceholderTop = $(this.refs.section_nav_position_placeholder).offset().top;

	    console.log(sectionNavTop, sectionNavPlaceholderTop);

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

	render() {
		let sections;

		if (this.props.type == "indicator") {
			sections = (
			<div className="section-nav__items">
				<a href='#about'>
					<div className="section-nav__item">
						<SvgIcon name='students' />
						<h3 className="section-nav__item__text">About</h3>
					</div>
				</a>
				<a href='#rankings'>
					<div className="section-nav__item">
						<SvgIcon name='loans' />
						<h3 className="section-nav__item__text">Rankings</h3>
					</div>
				</a>
				<a href='#trends'>
					<div className="section-nav__item">
						<SvgIcon name='grants' />
						<h3 className="section-nav__item__text">Trends</h3>
					</div>
				</a>
			</div>
			);
		} else {
			sections = (
			<div className="section-nav__items">
				<a href='#students'>
					<div className="section-nav__item">
						<SvgIcon name='students' />
						<h3 className="section-nav__item__text">Students</h3>
					</div>
				</a>
				<a href='#loans'>
					<div className="section-nav__item">
						<SvgIcon name='loans' />
						<h3 className="section-nav__item__text">Loans</h3>
					</div>
				</a>
				<a href='#grants'>
					<div className="section-nav__item">
						<SvgIcon name='grants' />
						<h3 className="section-nav__item__text">Grants</h3>
					</div>
				</a>
				<a href='#schools'>
					<div className="section-nav__item">
						<SvgIcon name='books' />
						<h3 className="section-nav__item__text">Schools</h3>
					</div>
				</a>
				<a href='#outcomes'>
					<div className="section-nav__item">
						<SvgIcon name='outcomes' />
						<h3 className="section-nav__item__text">Outcomes</h3>
					</div>
				</a>
			</div>
			);
		}

		let sectionNavClass = "section-nav";
		sectionNavClass += this.state.fixed ? " fixed" : "";

		let sectionNavPlaceholderClass = "section-nav__placeholder";
		sectionNavPlaceholderClass += this.state.fixed ? " fixed" : "";

		return (
			<div>
				<div ref="section_nav_position_placeholder" className={sectionNavPlaceholderClass} />
		    	<div ref="section_nav" className={sectionNavClass}>
		    		{sections}
		    	</div>
		    </div>
	    );
	}
}

