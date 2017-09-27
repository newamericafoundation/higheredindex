var d3 = require("d3");
import React from 'react';
import RankChart from "./RankChart";
import FilterGroup from "../components/FilterGroup";
import { getColorScale } from "../helper_functions/get_color_scale.js";
import UsMap from "./UsMap";
import LegendQuantize from "../components/LegendQuantize.js";
import { connect } from 'react-redux'
import { fetchAllStatesData } from '../actions'
import { stateIdMappings } from "./state-id-mappings"
import $ from 'jquery';

class RankingsDashboard extends React.Component {
	constructor(props) {
		super(props);

		console.log(props)

		this.resizeFunc = this.resize.bind(this);

		let initialFilter = props.filters[0];
		this.state = {
			currFilter: initialFilter,
			currHovered: null,
			valsShown: [0,1,2,3,4], 
			currData: null,
			currColorScale: null,
			currWidth: 700
				// valsShown: Array.from(Array(initialFilter.numBins).keys()),
		}
	}

	componentWillMount() {
		console.log("in component will mount")
		$(window).resize(this.resizeFunc);
		
		console.log(this.props)
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
        console.log("resizing!");
    }

    getCurrWidth() {
    	console.log($(this.refs.renderingArea).width())
        return $(this.refs.renderingArea).width();
    }

	// componentWillReceiveProps(nextProps) {
	// 	const {fetchedAllStatesData, collectionName, filters} = this.props;

	// 	console.log("in component will receive props", nextProps, this.props, this.state)

	// 	if ((!fetchedAllStatesData[collectionName] || fetchedAllStatesData[collectionName] == "fetching") && (nextProps.fetchedAllStatesData[collectionName] && nextProps.fetchedAllStatesData[collectionName] != "fetching")) {
	// 		let currData = this.getCurrData(nextProps, this.state.currFilter)
	// 		this.setState({
	// 			currData: currData,
	// 			currColorScale: getColorScale(currData, this.state.currFilter)
	// 		})

	// 	}
	// }

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
		let sampleDataPoint = fullStatesData[0][currFilterVar]
		
		if (sampleDataPoint && typeof sampleDataPoint === 'object') {
		 	this.currMaxYear = Object.keys(sampleDataPoint).reduce(function(a, b){ return +sampleDataPoint[a] > +sampleDataPoint[b] ? a : b });
		}

		let currData = fullStatesData.map((d) => {
			let dataVal = d[currFilterVar]
			
			if (typeof dataVal === 'object') {
				dataVal = dataVal[this.currMaxYear]
			}

			let retVal = {
				name: d.name,
				abbreviation: d.state_abbrev,
				state_id: stateIdMappings[d.name],
			}

			retVal[currFilterVar] = dataVal;

			return retVal;
		})


		return currData;
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
							width={this.state.currWidth - 90} 
							height={this.state.currWidth/5} />
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

export default RankingsDashboard