import React from 'react';
import { connect } from 'react-redux'
import {Helmet} from "react-helmet";
import { Form, Text, Select, Radio, RadioGroup, submitForm } from 'react-form'


import SearchBox from '../components/SearchBox';
import SvgIcon from '../components/SvgIcon';

const stateOptions = [
	{label: "Alabama", value: "AL"},
	{label: "Alaska", value: "AK"},
	{label: "Arizona", value: "AZ"},
	{label: "Arkansas", value: "AR"},
	{label: "California", value: "CA"},
	{label: "Colorado", value: "CO"},
	{label: "Connecticut", value: "CT"},
	{label: "Delaware", value: "DE"},
	{label: "District of Columbia", value: "DC"},
	{label: "Florida", value: "FL"},
	{label: "Georgia", value: "GA"},
	{label: "Hawaii", value: "HI"},
	{label: "Idaho", value: "ID"},
	{label: "Illinois", value: "IL"},
	{label: "Indiana", value: "IN"},
	{label: "Iowa", value: "IA"},
	{label: "Kansas", value: "KS"},
	{label: "Kentucky", value: "KY"},
	{label: "Louisiana", value: "LA"},
	{label: "Maine", value: "ME"},
	{label: "Maryland", value: "MD"},
	{label: "Massachusetts", value: "MA"},
	{label: "Michigan", value: "MI"},
	{label: "Minnesota", value: "MN"},
	{label: "Mississippi", value: "MS"},
	{label: "Missouri", value: "MO"},
	{label: "Montana", value: "MT"},
	{label: "Nebraska", value: "NE"},
	{label: "Nevada", value: "NV"},
	{label: "New Hampshire", value: "NH"},
	{label: "New Jersey", value: "NJ"},
	{label: "New Mexico", value: "NM"},
	{label: "New York", value: "NY"},
	{label: "North Carolina", value: "NC"},
	{label: "North Dakota", value: "ND"},
	{label: "Ohio", value: "OH"},
	{label: "Oklahoma", value: "OK"},
	{label: "Oregon", value: "OR"},
	{label: "Pennsylvania", value: "PA"},
	{label: "Rhode Island", value: "RI"},
	{label: "South Carolina", value: "SC"},
	{label: "South Dakota", value: "SD"},
	{label: "Tennessee", value: "TN"},
	{label: "Texas", value: "TX"},
	{label: "Utah", value: "UT"},
	{label: "Vermont", value: "VT"},
	{label: "Virginia", value: "VA"},
	{label: "Washington", value: "WA"},
	{label: "West Virginia", value: "WV"},
	{label: "Wisconsin", value: "WI"},
	{label: "Wyoming", value: "WY"}
]

class ListingsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
	    	counts: null,
	    	type: props.type,
	    	subfilter: null
	    };
	}

	listingsChangedCallback(counts) {
		this.setState({
			counts
		})
	}

	getListingsIcon(type) {
		let iconName;
		if (type == "states") { 
		  	iconName = 'state'; 
		} else if (type == "institutions") { 
		  	iconName = "institution";
		} else if (type == "indicators") {
		  	iconName = "indicator";
		} else {
			return null;
		}
		return <SvgIcon name={iconName} />
	}

	changeFilter(newFilter) {
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
		return (
			<div className="listings-page">
		        <Helmet>
		            <title>Search Results: {this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1)}</title>
		            <meta name="description" content="New America Higher Ed Index" />
					<meta name="twitter:card" content="New America Higher Ed Index" />
					<meta name="twitter:title" content="Higher Ed Index: Search Listings" />
					<meta name="twitter:description" content="New America Higher Ed Index"/>
					<meta property="og:title" content="Higher Ed Index: Search Listings" />
					<meta property="og:description" content="New America Higher Ed Index" />
		        </Helmet>
				<div className="listings-page__top-bar">
					<div className="listings-page__top-bar__container">
						<div className="listings-page__top-bar__filter-label">
							<h5 className="listings-page__top-bar__filter-label__text">Filters</h5>
						</div>
						<SearchBox alwaysRenderSuggestions={true} suggestionsChangedCallback={this.listingsChangedCallback.bind(this)} filter={this.state.type} subfilter={this.state.subfilter} />
						<SvgIcon name="search" />
					</div>
				</div>
				<div className="listings-page__main">
					<div className="listings-page__overlay" />
					<div className="listings-page__content">
						<div className="listings-page__filter-container">
							<div className="listings-page__filter-container__primary">
								{this.renderCountBox("states")}
								{this.renderCountBox("institutions")}
								{this.renderCountBox("indicators")}
								{this.renderCountBox("all")}
							</div>
							{this.state.type === "institutions" && 
								<div className="listings-page__filter-container__secondary">
									<Form
							            onChange={(internalState) => {
							            	console.log(internalState)
							              // this.onChange(internalState.values);
							            }} >
							            {({submitForm}) => {
							              return (
							                <form onSubmit={submitForm}>
							                    <RadioGroup field="sector">
								                  { group => (
								                    <div className="listings-page__subfilter">
								                    	<Radio className="listings-page__subfilter__radio" group={group} value="all" id="all" />
								                      	<label className="listings-page__subfilter__label" htmlFor="all" >All Sectors</label>
								                      	<Radio className="listings-page__subfilter__radio" group={group} value="pub2" id="pub2" />
								                      	<label className="listings-page__subfilter__label" htmlFor="pub2" >Public, Two-Year</label>
								                      	<Radio className="listings-page__subfilter__radio" group={group} value="pub4" id="pub4" />
								                      	<label className="listings-page__subfilter__label" htmlFor="pub4" >Public, Four-Year</label>
								                      	<Radio className="listings-page__subfilter__radio" group={group} value="nonprofit2" id="nonprofit2" />
								                      	<label className="listings-page__subfilter__label" htmlFor="nonprofit2" >Nonprofit, Less than Two-Year</label>
								                      	<Radio className="listings-page__subfilter__radio" group={group} value="nonprofit4" id="nonprofit4" />
								                      	<label className="listings-page__subfilter__label" htmlFor="nonprofit4" >Nonprofit, Four-Year</label>
								                    </div>
								                  )}
								                </RadioGroup>
								                 <Select field="status" id="status" className="listings-page__subfilter" options={stateOptions} />
							                </form>
							              )
							            }}
							        </Form>
								</div>	
							}
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
	return {
		type: ownProps.location.hash.replace("#",""),
	}
}

export default connect(mapStateToProps)(ListingsPage)