import React from 'react';
const d3 = require("d3");
const $ = require('jquery');

import {colors} from '../../helper_functions/colors'

export default class FilterGroup extends React.Component {
	constructor(props) {
		super(props);

		this.filterCategories = d3.nest()
			.key((d) => { return d.category; })
			.entries(props.filters);

		this.state = {
			currCategory: 0,
			currFilter: 0,
			displayDirection: "horizontal"
		}
	}

	componentWillReceiveProps(nextProps) {
		const {width} = this.props;
		console.log(this.refs)
		console.log($(this.refs.contentsDiv).width())
		console.log(nextProps.width)

		if (nextProps.width != this.props.width) {
			if (this.state.displayDirection == "horizontal" && $(this.refs.contentsDiv).width() > nextProps.width) {
				console.log("greater")
				this.setState({
					displayDirection: "vertical"
				})
			} else if (this.state.displayDirection == "vertical" && nextProps.width >= 1050) {
				console.log("less")
				this.setState({
					displayDirection: "horizontal"
				})
			}
		}
		
	}

	changeCategory(categoryIndex) {
		let selectRef = this.refs["select" + categoryIndex];
		let filterIndex = selectRef ? selectRef.value : 0;
		
		this.props.filterChangedFunc(this.filterCategories[categoryIndex].values[filterIndex].index);

		this.setState({
			currCategory: categoryIndex,
			currFilter: filterIndex
		});
	}

	changeFilter(categoryIndex) {
		let filterIndex = this.refs["select" + categoryIndex].value;
		this.props.filterChangedFunc(this.filterCategories[categoryIndex].values[filterIndex].index);
		this.setState({
			currFilter: filterIndex
		});
	}

	renderFilter(filterCategory, i) {
		let className = "filter-group__category";
		let containerStyleObject = {},
			toggleStyleObject = {};



		if (i == this.state.currCategory) {
			className += " active";
			let catColor = filterCategory.values[0].color;

			if (catColor) {
				containerStyleObject.borderColor = colors[catColor].light;
				toggleStyleObject.backgroundColor = colors[catColor].light;
			}
		}
				
		if (filterCategory.values.length > 1) {
			return (<li key={i} className={className} style={containerStyleObject}>
				<div className="filter-group__category__contents">
					<div className="filter-group__category__toggle" style={toggleStyleObject} onClick={() => { this.changeCategory(i); } }>{ filterCategory.key }</div>
					<select className="filter-group__category__select" ref={"select" + i} onChange={() => { this.changeFilter(i); }}>
						{filterCategory.values.map((filter, j) => {
							return (
								<option key={j} value={j}>{filter.displayName}</option>
							)
						})}

					</select>
				</div>
			</li>)
				
		} else {
			return (<li key={i} className={className} style={containerStyleObject}>
				<div className="filter-group__category__contents">
					<div className="filter-group__category__toggle" style={toggleStyleObject} onClick={() => { this.changeCategory(i); } }>{ filterCategory.key }</div>
				</div>
			</li>)
		}
	}

	render() {

		console.log(this.state.displayDirection)
		return (
			<div className="filter-group__container">
				<ul className={"filter-group " + this.state.displayDirection} ref="contentsDiv">
					{this.filterCategories.map((filterCat, i) => {
						return this.renderFilter(filterCat, i);
					})}
				</ul>
				
			</div>
		)
	}
}