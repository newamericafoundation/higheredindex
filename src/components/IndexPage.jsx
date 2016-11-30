'use strict';

import React from 'react';
import AthletePreview from './AthletePreview';
import $ from 'jquery';

export default class IndexPage extends React.Component {
	constructor() {
		super();
		this.state = {
	      athletes: [],
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
	      url: '/api/athletes',
	      data: filter,
	      dataType: 'json',
	      cache: false,
	      success: function loadDataSuccess(data) {
	      	console.log(data);
	        this.setState({ athletes: data });
	      }.bind(this),
	      error: function loadDataError(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this),
	    });
	}
	render() {
		const athletes = this.state.athletes;
		console.log(athletes);
		return (
			<div className="home">
				<div className="athletes-selector">
					{athletes.map(athleteData => <AthletePreview key={athleteData.id} {...athleteData} />)}
				</div>
			</div>
		);
	}
}
