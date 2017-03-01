import React from 'react';
var d3 = require("d3");

export default class FilterGroup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currCategory: 0,
			currFilter: 0
		}

	}

	changeFilter(newCategory) {
		console.log(this.refs.select1.value);
		this.props.filterChangedFunc(newCategory, newFilter);
		this.setState({
			currCategory: newCategory,
			currFilter: newValue
		})
	}

	renderFilter(filterCategory, i) {
		let className = "filter-group__category";
		className += i == this.state.currCategory ? " active" : "";
		console.log(filterCategory);
		if (filterCategory.filters.length > 1) {
			return (<li key={i} className={className}>
				<select ref={"select" + i} onChange={() => { this.changeFilter(i); }}>
					<option selected hidden>{filterCategory.label}</option>
					{filterCategory.filters.map((filter, j) => {
						return (
							<option key={j} value={j}>{filter.displayName}</option>
						)
					})}

				</select>
			</li>)
				
		} else {
			return <li key={filter.displayName} className={className} onClick={() => this.changeFilter(i)}></li>
		}
	}

	render() {
		return (
			<div className="filter-group__container">
				<ul className="filter-group">
					{this.props.filterCategories.map((filterCat, i) => {
						return this.renderFilter(filterCat, i);
					})}
				</ul>
				
			</div>
		)
	}
}