import React from 'react';

import SearchBox from "./SearchBox.jsx";
import { browserHistory } from 'react-router';
import SvgIcon from './SvgIcon';

export default class ExpandableSearchBox extends React.Component {
	constructor() {
		super();
		this.state = {
	      expanded: false
	    };
	}

	componentWillMount() {
		this.unlisten = browserHistory.listen(() => { 
		    this.setState({
		      expanded: false,
		    });
		});
	}

	componentWillUnmount() {
		this.unlisten();
	}
	expand() {
		this.setState({ expanded:!this.state.expanded });
	}
	render() {
		return (
			<div>
				<div className="search-box__icon" onClick={this.expand.bind(this)}  >
					<SvgIcon name="search" />
				</div>
				<SearchBox expandable expanded={this.state.expanded} filter={this.props.filter} />
			</div>
		)
	}
}
