'use strict';

import React from 'react';
import SearchBox from './SearchBox.jsx';

export default class ListingsPage extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
	}

	render() {
		
		return (
			<div className="listings-page">
				<SearchBox alwaysRenderSuggestions={true} />
			</div>
		);
	}
}
