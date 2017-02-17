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
		if (type == "state") {
			iconName = "map-marker";
		} else {
			iconName = "institution";
		}
		return <SvgIcon name={iconName} />
	}

	changeFilter(newFilter) {
		console.log(window.location);
		this.setState({
			type: newFilter
		});
		window.location.hash = "#" + newFilter;

	}

	render() {
		
		return (
			<div className="listings-page">
				<div className="listings-page__filter-container">
					{this.state.counts && this.state.counts.map((count, i) => {
						let className = "listings-page__filter-link";
						console.log(this.state.type);
						if (count.key === this.state.type ) {
							className += " active";
						}
						
						return(
							<a key={count.key} onClick={() => {return this.changeFilter(count.key)}} className={className} >
								<div className="listings-page__filter">
									{this.getListingsIcon(count.key)}
									<h5 className="listings-page__filter__label">{count.key + "s:"}</h5>
									<h5 className="listings-page__filter__value">{count.value}</h5>
								</div>
							</a>
						)
					})}
				</div>
				<div className="listings-page__results-container">
					<SearchBox alwaysRenderSuggestions={true} suggestionsChangedCallback={this.listingsChangedCallback.bind(this)}/>
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