'use strict';

import React from 'react';
import { connect } from 'react-redux'
import SearchBox from './SearchBox.jsx';
import SvgIcon from './SvgIcon';

class ListingsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
	    	counts: null,
	    	type: props.type
	    };
	}
	componentDidMount() {
	}

	listingsChangedCallback(counts) {
		console.log(counts);
		this.setState({
			counts: counts
		})
	}

	getListingsIcon(type) {

		let iconName;
		if (type == "states") { 
		  	iconName = 'state'; 
		} else if (type == "institutions") { 
		  	iconName = "institution";
		} else if (type == "indicators") {
		  	iconName = "bar-chart";
		} else {
			return null;
		}
		return <SvgIcon name={iconName} />
	}

	changeFilter(newFilter) {
		console.log(newFilter);
		console.log(window.location);
		this.setState({
			type: newFilter
		});
		window.location.hash = "#" + newFilter;
	}

	renderCountBox(type) {
		let className = "listings-page__filter-link";

		className += type === this.state.type ? " active" : "";
		let value = this.state.counts && this.state.counts[type] ? this.state.counts[type] : 0;
		
		return(
			<a key={type} onClick={() => {return this.changeFilter(type)}} className={className} >
				<div className="listings-page__filter">
					{this.getListingsIcon(type)}
					<h5 className="listings-page__filter__label">{type}:</h5>
					<h5 className="listings-page__filter__value">{value}</h5>
				</div>
			</a>
		)
	}

	render() {
		console.log(this.state);
		return (
			<div className="listings-page">
				<div className="listings-page__top-bar">
					<div className="listings-page__top-bar__container">
						<div className="listings-page__top-bar__filter-label">
							<h5 className="listings-page__top-bar__filter-label__text">Filters</h5>
						</div>
						<SearchBox alwaysRenderSuggestions={true} suggestionsChangedCallback={this.listingsChangedCallback.bind(this)} filter={this.state.type}/>
						<SvgIcon name="search" />
					</div>
				</div>
				<div className="listings-page__main">
					<div className="listings-page__overlay" />
					<div className="listings-page__content">
						<div className="listings-page__filter-container">
							{this.renderCountBox("states")}
							{this.renderCountBox("institutions")}
							{this.renderCountBox("indicators")}
							{this.renderCountBox("all")}
						</div>
						<div className="listings-page__results-container">
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log(ownProps);
  return {
    type: ownProps.location.hash.replace("#",""),
  }
}


export default connect(mapStateToProps)(ListingsPage)