import React from 'react';
var d3 = require("d3");

export default class FilterGroup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currFilter: 0
		}

	}

	changeFilter(newValue) {
		console.log(newValue);
		this.props.filterChangedFunc(newValue);
		this.setState({
			currFilter: newValue
		})
	}

	render() {
		console.log(this.props.filters);
		return (
			<div className="filter-group__container">
				<ul className="filter-group">
					{this.props.filters.map((filter, i) => {
						let className = "filter-group__filter";
						className += i == this.state.currFilter ? " active" : "";
						return <li key={filter.displayName} className={className} onClick={() => this.changeFilter(i)}>{filter.displayName}</li>
					})}
				</ul>
				
			</div>
		)
	}
}