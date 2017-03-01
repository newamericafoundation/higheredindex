var d3 = require("d3");
import React from 'react';
import RankChart from "./RankChart";
import FilterGroup from "../components/FilterGroup";
import { getColorScale } from "../helper_functions/get_color_scale.js";
import UsMap from "./UsMap";

const fakeData = [{"_id":"58af560c8e601381024b2240","state":"Alabama","state_id":1,"abbreviation":"AL","value":12,"value1":30,"value2":23,"value3":18,"value4":17},{"_id":"58af560c8e601381024b2241","state":"Alaska","state_id":2,"abbreviation":"AK","value":20,"value1":14,"value2":5,"value3":4,"value4":1},{"_id":"58af560c8e601381024b2242","state":"Arizona","state_id":4,"abbreviation":"AZ","value":26,"value1":22,"value2":23,"value3":15,"value4":8},{"_id":"58af560c8e601381024b2243","state":"Arkansas","state_id":5,"abbreviation":"AR","value":24,"value1":2,"value2":6,"value3":1,"value4":16},{"_id":"58af560c8e601381024b2244","state":"California","state_id":6,"abbreviation":"CA","value":23,"value1":3,"value2":30,"value3":13,"value4":15},{"_id":"58af560c8e601381024b2245","state":"Colorado","state_id":8,"abbreviation":"CO","value":29,"value1":17,"value2":7,"value3":4,"value4":22},{"_id":"58af560c8e601381024b2246","state":"Connecticut","state_id":9,"abbreviation":"CT","value":8,"value1":3,"value2":27,"value3":26,"value4":19},{"_id":"58af560c8e601381024b2247","state":"Delaware","state_id":10,"abbreviation":"DE","value":1,"value1":23,"value2":5,"value3":14,"value4":13},{"_id":"58af560c8e601381024b2248","state":"District of Columbia","state_id":11,"abbreviation":"DC","value":27,"value1":1,"value2":2,"value3":27,"value4":26},{"_id":"58af560c8e601381024b2249","state":"Florida","state_id":12,"abbreviation":"FL","value":12,"value1":24,"value2":29,"value3":19,"value4":18},{"_id":"58af560c8e601381024b224a","state":"Georgia","state_id":13,"abbreviation":"GA","value":8,"value1":22,"value2":30,"value3":26,"value4":9},{"_id":"58af560c8e601381024b224b","state":"Hawaii","state_id":15,"abbreviation":"HI","value":24,"value1":15,"value2":19,"value3":13,"value4":12},{"_id":"58af560c8e601381024b224c","state":"Idaho","state_id":16,"abbreviation":"ID","value":20,"value1":5,"value2":25,"value3":4,"value4":15},{"_id":"58af560c8e601381024b224d","state":"Illinois","state_id":17,"abbreviation":"IL","value":21,"value1":17,"value2":21,"value3":17,"value4":11},{"_id":"58af560c8e601381024b224e","state":"Indiana","state_id":18,"abbreviation":"IN","value":6,"value1":13,"value2":29,"value3":12,"value4":12},{"_id":"58af560c8e601381024b224f","state":"Iowa","state_id":19,"abbreviation":"IA","value":13,"value1":12,"value2":28,"value3":27,"value4":1},{"_id":"58af560c8e601381024b2250","state":"Kansas","state_id":20,"abbreviation":"KS","value":20,"value1":30,"value2":1,"value3":30,"value4":10},{"_id":"58af560c8e601381024b2251","state":"Kentucky","state_id":21,"abbreviation":"KY","value":12,"value1":1,"value2":25,"value3":29,"value4":13},{"_id":"58af560c8e601381024b2252","state":"Louisiana","state_id":22,"abbreviation":"LA","value":9,"value1":30,"value2":18,"value3":11,"value4":25},{"_id":"58af560c8e601381024b2253","state":"Maine","state_id":23,"abbreviation":"ME","value":9,"value1":15,"value2":18,"value3":21,"value4":27},{"_id":"58af560c8e601381024b2254","state":"Maryland","state_id":24,"abbreviation":"MD","value":8,"value1":11,"value2":24,"value3":6,"value4":21},{"_id":"58af560c8e601381024b2255","state":"Massachusetts","state_id":25,"abbreviation":"MA","value":14,"value1":19,"value2":27,"value3":15,"value4":29},{"_id":"58af560c8e601381024b2256","state":"Michigan","state_id":26,"abbreviation":"MI","value":28,"value1":10,"value2":2,"value3":22,"value4":5},{"_id":"58af560c8e601381024b2257","state":"Minnesota","state_id":27,"abbreviation":"MN","value":19,"value1":12,"value2":9,"value3":5,"value4":9},{"_id":"58af560c8e601381024b2258","state":"Mississippi","state_id":28,"abbreviation":"MS","value":15,"value1":17,"value2":11,"value3":12,"value4":14},{"_id":"58af560c8e601381024b2259","state":"Missouri","state_id":29,"abbreviation":"MO","value":30,"value1":6,"value2":7,"value3":23,"value4":19},{"_id":"58af560c8e601381024b225a","state":"Montana","state_id":30,"abbreviation":"MT","value":17,"value1":11,"value2":8,"value3":25,"value4":21},{"_id":"58af560c8e601381024b225b","state":"Nebraska","state_id":31,"abbreviation":"NE","value":30,"value1":19,"value2":1,"value3":9,"value4":23},{"_id":"58af560c8e601381024b225c","state":"Nevada","state_id":32,"abbreviation":"NV","value":21,"value1":4,"value2":8,"value3":29,"value4":6},{"_id":"58af560c8e601381024b225d","state":"New Hampshire","state_id":33,"abbreviation":"NH","value":27,"value1":6,"value2":7,"value3":25,"value4":20},{"_id":"58af560c8e601381024b225e","state":"New Jersey","state_id":34,"abbreviation":"NJ","value":26,"value1":14,"value2":27,"value3":12,"value4":21},{"_id":"58af560c8e601381024b225f","state":"New Mexico","state_id":35,"abbreviation":"NM","value":16,"value1":3,"value2":6,"value3":20,"value4":26},{"_id":"58af560c8e601381024b2260","state":"New York","state_id":36,"abbreviation":"NY","value":5,"value1":27,"value2":22,"value3":19,"value4":19},{"_id":"58af560c8e601381024b2261","state":"North Carolina","state_id":37,"abbreviation":"NC","value":22,"value1":19,"value2":22,"value3":28,"value4":4},{"_id":"58af560c8e601381024b2262","state":"North Dakota","state_id":38,"abbreviation":"ND","value":1,"value1":24,"value2":3,"value3":3,"value4":2},{"_id":"58af560c8e601381024b2263","state":"Ohio","state_id":39,"abbreviation":"OH","value":9,"value1":5,"value2":11,"value3":24,"value4":26},{"_id":"58af560c8e601381024b2264","state":"Oklahoma","state_id":40,"abbreviation":"OK","value":17,"value1":19,"value2":26,"value3":22,"value4":6},{"_id":"58af560c8e601381024b2265","state":"Oregon","state_id":41,"abbreviation":"OR","value":4,"value1":10,"value2":13,"value3":7,"value4":23},{"_id":"58af560c8e601381024b2266","state":"Pennsylvania","state_id":42,"abbreviation":"PA","value":22,"value1":4,"value2":30,"value3":2,"value4":4},{"_id":"58af560c8e601381024b2267","state":"Rhode Island","state_id":44,"abbreviation":"RI","value":14,"value1":19,"value2":14,"value3":1,"value4":23},{"_id":"58af560c8e601381024b2268","state":"South Carolina","state_id":45,"abbreviation":"SC","value":9,"value1":1,"value2":10,"value3":9,"value4":26},{"_id":"58af560c8e601381024b2269","state":"South Dakota","state_id":46,"abbreviation":"SD","value":20,"value1":15,"value2":29,"value3":16,"value4":28},{"_id":"58af560c8e601381024b226a","state":"Tennessee","state_id":47,"abbreviation":"TN","value":5,"value1":24,"value2":5,"value3":18,"value4":30},{"_id":"58af560c8e601381024b226b","state":"Texas","state_id":48,"abbreviation":"TX","value":12,"value1":30,"value2":13,"value3":5,"value4":22},{"_id":"58af560c8e601381024b226c","state":"Utah","state_id":49,"abbreviation":"UT","value":22,"value1":10,"value2":12,"value3":14,"value4":30},{"_id":"58af560c8e601381024b226d","state":"Vermont","state_id":50,"abbreviation":"VT","value":10,"value1":27,"value2":11,"value3":24,"value4":27},{"_id":"58af560c8e601381024b226e","state":"Virginia","state_id":51,"abbreviation":"VA","value":8,"value1":27,"value2":21,"value3":1,"value4":25},{"_id":"58af560c8e601381024b226f","state":"Washington","state_id":53,"abbreviation":"WA","value":19,"value1":3,"value2":27,"value3":18,"value4":5},{"_id":"58af560c8e601381024b2270","state":"West Virginia","state_id":54,"abbreviation":"WV","value":17,"value1":11,"value2":29,"value3":12,"value4":6},{"_id":"58af560c8e601381024b2271","state":"Wisconsin","state_id":55,"abbreviation":"WI","value":11,"value1":30,"value2":25,"value3":23,"value4":13},{"_id":"58af560c8e601381024b2272","state":"Wyoming","state_id":56,"abbreviation":"WY","value":11,"value1":19,"value2":6,"value3":7,"value4":28}];
export default class RankingsDashboard extends React.Component {
	constructor(props) {
		super(props);

		console.log(props.filterCategories);
		this.state = {
			currFilter: props.filterCategories[0].filters[0],
			currHovered: null
		}

		this.colorScale = getColorScale(fakeData, props.filterCategories[0].filters[0]);

	}

	filterChanged(newCategory, newFilter) {
		this.setState({
			currFilter: this.props.filterCategories[newCategory].filters[newFilter]
		})

		this.colorScale = getColorScale(fakeData, this.props.filterCategories[newCategory].filters[newFilter]);
	}

	setCurrHovered(id) {
		console.log("hovered!", id);
		this.setState({
			currHovered: id
		})
	}

	render() {

		return (
			<div className="rankings-dashboard">
				<FilterGroup filterCategories={this.props.filterCategories} filterChangedFunc={this.filterChanged.bind(this)}/>
				<UsMap filter={this.state.currFilter} data={fakeData} colorScale={this.colorScale} currHovered={this.state.currHovered} hoverChangeFunc={this.setCurrHovered.bind(this)}/>
				<RankChart filter={this.state.currFilter} data={fakeData} colorScale={this.colorScale} currHovered={this.state.currHovered} hoverChangeFunc={this.setCurrHovered.bind(this)}/>
			</div>
		)
	}

}