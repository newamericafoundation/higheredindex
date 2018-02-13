import React from 'react';
import { connect } from 'react-redux'
import $ from 'jquery';
const d3 = require("d3");

import RankChart from "./RankChart";
import FilterGroup from "../components/FilterGroup";
import { getColorScale } from "../../helper_functions/get_color_scale.js";
import UsMap from "./UsMap";
import LegendQuantize from "../components/LegendQuantize.js";
import { fetchAllStatesData } from '../../actions'
import { stateIdMappings } from "./state-id-mappings"

class RankingsDashboard extends React.Component {
	constructor(props) {
		super(props);

		this.resizeFunc = this.resize.bind(this);

		let initialFilter = props.filters[0];
		this.state = {
			currFilter: initialFilter,
			currHovered: null,
			valsShown: [0,1,2,3,4],
			currData: null,
			currColorScale: null,
			currWidth: 700
		}
	}

	componentWillMount() {
		$(window).resize(this.resizeFunc);

		let currData = this.getCurrData(this.props, this.state.currFilter)
		this.setState({
			currData: currData,
			currColorScale: getColorScale(currData, this.state.currFilter)
		})
	}

	componentDidMount() {
		if (this.state.currData) {
			this.resize();
		}
	}

	componentWillUnmount() {
        $(window).off("resize", this.resizeFunc);
    }

    resize() {
        let w = this.getCurrWidth();
        this.setState({
          currWidth: w,
        })
    }

    getCurrWidth() {
        return $(this.refs.renderingArea).width();
    }

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currData == null && this.state.currData) {
			this.resize()
		}
	}

	filterChanged(newFilter) {
		let nextFilter = this.props.filters[newFilter];
		let currData = this.getCurrData(this.props, nextFilter)

		this.setState({
			currFilter: nextFilter,
			valsShown: [0,1,2,3,4],
			currData: currData,
			currColorScale: getColorScale(currData, nextFilter)
		})
	}

	setCurrHovered(id) {
		this.setState({
			currHovered: id
		})
	}

	toggleValsShown(valsShown) {
		this.setState({
			valsShown: valsShown
		})
	}

	getCurrData(props, filter) {
		const { data, collectionName} = props;

		let currFilterVar = filter.variable;

		let fullStatesData = data.filter(d => d.state != "US")

		this.currMaxYear = this.getMaxYear(fullStatesData, currFilterVar)

		let currData = fullStatesData.map((d) => {
			let dataVal = d[currFilterVar]

			if (typeof dataVal === 'object') {
				dataVal = dataVal[this.currMaxYear]
			}

			let retVal = {
				name: d.name,
				path: d.path,
				abbreviation: d.state_abbrev,
				state_id: stateIdMappings[d.name],
			}

			retVal[currFilterVar] = dataVal;

			return retVal;
		})

		return currData;
	}

	// picks three sample data points and returns with the latest year that has data for any of them
	getMaxYear(data, currFilterVar) {
		let sampleDataPoints = [
			data[15][currFilterVar],
			data[21][currFilterVar],
			data[31][currFilterVar]
		]

		let overallMaxYear = 0;
		sampleDataPoints.forEach(dataPoint => {
			if ((dataPoint || dataPoint === 0) && typeof dataPoint === 'object') {
				let maxYear = Object.keys(dataPoint).reduce((a, b) => {
					if (isNaN(dataPoint[b])) {
						return a
					} else if (isNaN(dataPoint[a])) {
						return b
					} else {
						return +a > +b ? a : b
					}
				});
				overallMaxYear = Math.max(maxYear, overallMaxYear)
			}
		})

		return overallMaxYear
	}

	render() {
		const { collectionName } = this.props;

		if (this.state.currData) {
			return (
				<div className="rankings-dashboard">
					<div className="rankings-dashboard__content" ref="renderingArea">
						<FilterGroup
							filters={this.props.filters}
							filterChangedFunc={this.filterChanged.bind(this)}
							width={this.state.currWidth} />
						<h5 className="rankings-dashboard__max-year">{"This map reflects data for " + this.currMaxYear + ", the most recent year available for this category."}</h5>
						<UsMap
							filter={this.state.currFilter}
							data={this.state.currData}
							colorScale={this.state.currColorScale}
							valsShown={this.state.valsShown}
							currHovered={this.state.currHovered}
							hoverChangeFunc={this.setCurrHovered.bind(this)}
							width={this.state.currWidth}
							height={3*this.state.currWidth/5} />
						<LegendQuantize
							filter={this.state.currFilter}
							colorScale={this.state.currColorScale}
							toggleChartVals={this.toggleValsShown.bind(this)}
							valsShown={this.state.valsShown} />
						<RankChart
							filter={this.state.currFilter}
							data={this.state.currData}
							colorScale={this.state.currColorScale}
							valsShown={this.state.valsShown}
							currHovered={this.state.currHovered}
							hoverChangeFunc={this.setCurrHovered.bind(this)}
							width={this.state.currWidth}
							height={this.state.currWidth < 600 ? 150 : this.state.currWidth/5} />
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

export default RankingsDashboard
