'use strict';

import React from 'react';
import StatePreview from './StatePreview';
import $ from 'jquery';

export default class SearchPage extends React.Component {
	constructor() {
		super();
		this.state = {
	      states: [],

	    };
	}
	componentDidMount() {
	    this.loadData();
	}

	loadData() {
		console.log("loading data");
	    const query = this.props.location.query || {};
	    const filter = {
	      // priority: query.priority,
	      // status: query.status,
	    };
	    $.ajax({
	      url: 'http://localhost:3000/api/states',
	      data: filter,
	      dataType: 'json',
	      cache: false,
	      success: function loadDataSuccess(data) {
	      	console.log(data);
	        this.setState({ states: data });
	      }.bind(this),
	      error: function loadDataError(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this),
	    });
	}
	render() {
		const states = this.state.states;
		console.log(states);
		return (
			<div className="home">
				<div className="states-selector">
					{states.map(stateData => <StatePreview key={stateData.id} {...stateData} />)}
				</div>
			</div>
		);
	}
}
