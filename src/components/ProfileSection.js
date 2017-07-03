'use strict';

import React from 'react';
import { connect } from 'react-redux'
import DataBlock from './DataBlock';

import $ from 'jquery';

import SvgIcon from './SvgIcon'

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

	render() {
		console.log("rendering");
		return (
	    	<section ref="profile_section" className="profile-section">
	    		<a className="profile-section__anchor" name={this.props.title.toLowerCase()} />
	    		<div className="profile-section__title-container">
	    			<h3 className="profile-section__title">{this.props.title}</h3>
	    			<h5 className="profile-section__subtitle">{this.props.subtitle}</h5>
	    		</div>
	    		<div>
		          {this.props.settings.map((settings, i) => {
		            return <DataBlock key={i} settings={settings} data={this.props.data} />;
		          })}
		        </div>
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

