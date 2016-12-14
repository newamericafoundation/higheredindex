import React from 'react';

import SearchBox from "./SearchBox.jsx";
import $ from 'jquery';

export default class ExpandableSearchBox extends React.Component {
	constructor() {
		super();
		this.state = {
	      expanded: false
	    };
	}
	expand() {
		
		console.log("expanding");
		this.setState({ expanded:!this.state.expanded });
	}
	render() {
		return (
			<div>
				<div className="search-box__icon" onClick={this.expand.bind(this)}  >
					<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100">
						<g>
							<path d="M45.406,19.602c-13.891,0.002-25.191,11.307-25.195,25.201c0.004,13.883,11.303,25.176,25.184,25.176
								c13.898,0,25.201-11.295,25.201-25.184C70.59,30.902,59.287,19.602,45.406,19.602 M45.395,76.303
								c-17.363,0-31.504-14.131-31.508-31.5c0.004-17.379,14.145-31.523,31.52-31.525c17.367,0,31.508,14.139,31.512,31.516
								C76.918,62.166,62.777,76.303,45.395,76.303"/>
							<path d="M82.949,86.723c-0.805,0-1.617-0.311-2.23-0.926L63.115,68.195c-1.236-1.234-1.236-3.236,0-4.471
								c1.236-1.236,3.232-1.236,4.467,0l17.604,17.6c1.236,1.236,1.236,3.238,0,4.473C84.57,86.412,83.76,86.723,82.949,86.723"/>
						</g>
					</svg>
				</div>
				<SearchBox expandable expanded={this.state.expanded}/>
			</div>
		)
	}
}