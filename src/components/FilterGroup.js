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

	changeCategory(categoryIndex) {
		let selectRef = this.refs["select" + categoryIndex];
		let filterIndex = selectRef ? selectRef.value : 0;
		
		this.props.filterChangedFunc(categoryIndex, filterIndex);

		this.setState({
			currCategory: categoryIndex,
			currFilter: filterIndex
		});
	}

	changeFilter(categoryIndex) {
		let filterIndex = this.refs["select" + categoryIndex].value;
		this.props.filterChangedFunc(categoryIndex, filterIndex);
		this.setState({
			currFilter: filterIndex
		});
	}

	renderFilter(filterCategory, i) {
		let className = "filter-group__category";
		className += i == this.state.currCategory ? " active" : "";
		console.log(filterCategory);
		if (filterCategory.filters.length > 1) {
			return (<li key={i} className={className}>
				<div className="filter-group__category__contents">
					<div className="filter-group__category__toggle" onClick={() => { this.changeCategory(i); } }>{ filterCategory.label }</div>
					<select className="filter-group__category__select" ref={"select" + i} onChange={() => { this.changeFilter(i); }}>
						{filterCategory.filters.map((filter, j) => {
							return (
								<option key={j} value={j}>{filter.displayName}</option>
							)
						})}

					</select>
				</div>
			</li>)
				
		} else {
			return (<li key={i} className={className}>
				<div className="filter-group__category__contents">
					<div className="filter-group__category__toggle" onClick={() => { this.changeCategory(i); } }>{ filterCategory.label }</div>
				</div>
			</li>)
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