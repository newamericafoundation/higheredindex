import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
var d3 = require("d3");
import $ from 'jquery';
import Legend from "../components/Legend.js";
import Tooltip from "../components/Tooltip.js";
import { formatValue } from "../helper_functions/format_value.js";
import { usStates } from './us-states.js';
import { getColorScale } from "../helper_functions/get_color_scale.js";

let margin = {top: 10, right: 0, bottom: 30, left: 60};

const fakeData = [{"_id":"58af33568e601381024b13d0","state":"Alabama","state_id":1,"abbreviation":"AL","value":28},{"_id":"58af33568e601381024b13d1","state":"Alaska","state_id":2,"abbreviation":"AK","value":22},{"_id":"58af33568e601381024b13d2","state":"Arizona","state_id":4,"abbreviation":"AZ","value":19},{"_id":"58af33568e601381024b13d3","state":"Arkansas","state_id":5,"abbreviation":"AR","value":26},{"_id":"58af33568e601381024b13d4","state":"California","state_id":6,"abbreviation":"CA","value":16},{"_id":"58af33568e601381024b13d5","state":"Colorado","state_id":8,"abbreviation":"CO","value":23},{"_id":"58af33568e601381024b13d6","state":"Connecticut","state_id":9,"abbreviation":"CT","value":23},{"_id":"58af33568e601381024b13d7","state":"Delaware","state_id":10,"abbreviation":"DE","value":11},{"_id":"58af33568e601381024b13d8","state":"District of Columbia","state_id":11,"abbreviation":"DC","value":21},{"_id":"58af33568e601381024b13d9","state":"Florida","state_id":12,"abbreviation":"FL","value":3},{"_id":"58af33568e601381024b13da","state":"Georgia","state_id":13,"abbreviation":"GA","value":18},{"_id":"58af33568e601381024b13db","state":"Hawaii","state_id":15,"abbreviation":"HI","value":14},{"_id":"58af33568e601381024b13dc","state":"Idaho","state_id":16,"abbreviation":"ID","value":23},{"_id":"58af33568e601381024b13dd","state":"Illinois","state_id":17,"abbreviation":"IL","value":4},{"_id":"58af33568e601381024b13de","state":"Indiana","state_id":18,"abbreviation":"IN","value":17},{"_id":"58af33568e601381024b13df","state":"Iowa","state_id":19,"abbreviation":"IA","value":1},{"_id":"58af33568e601381024b13e0","state":"Kansas","state_id":20,"abbreviation":"KS","value":19},{"_id":"58af33568e601381024b13e1","state":"Kentucky","state_id":21,"abbreviation":"KY","value":20},{"_id":"58af33568e601381024b13e2","state":"Louisiana","state_id":22,"abbreviation":"LA","value":4},{"_id":"58af33568e601381024b13e3","state":"Maine","state_id":23,"abbreviation":"ME","value":30},{"_id":"58af33568e601381024b13e4","state":"Maryland","state_id":24,"abbreviation":"MD","value":4},{"_id":"58af33568e601381024b13e5","state":"Massachusetts","state_id":25,"abbreviation":"MA","value":22},{"_id":"58af33568e601381024b13e6","state":"Michigan","state_id":26,"abbreviation":"MI","value":4},{"_id":"58af33568e601381024b13e7","state":"Minnesota","state_id":27,"abbreviation":"MN","value":26},{"_id":"58af33568e601381024b13e8","state":"Mississippi","state_id":28,"abbreviation":"MS","value":14},{"_id":"58af33568e601381024b13e9","state":"Missouri","state_id":29,"abbreviation":"MO","value":15},{"_id":"58af33568e601381024b13ea","state":"Montana","state_id":30,"abbreviation":"MT","value":19},{"_id":"58af33568e601381024b13eb","state":"Nebraska","state_id":31,"abbreviation":"NE","value":23},{"_id":"58af33568e601381024b13ec","state":"Nevada","state_id":32,"abbreviation":"NV","value":30},{"_id":"58af33568e601381024b13ed","state":"New Hampshire","state_id":33,"abbreviation":"NH","value":1},{"_id":"58af33568e601381024b13ee","state":"New Jersey","state_id":34,"abbreviation":"NJ","value":28},{"_id":"58af33568e601381024b13ef","state":"New Mexico","state_id":35,"abbreviation":"NM","value":29},{"_id":"58af33568e601381024b13f0","state":"New York","state_id":36,"abbreviation":"NY","value":22},{"_id":"58af33568e601381024b13f1","state":"North Carolina","state_id":37,"abbreviation":"NC","value":4},{"_id":"58af33568e601381024b13f2","state":"North Dakota","state_id":38,"abbreviation":"ND","value":30},{"_id":"58af33568e601381024b13f3","state":"Ohio","state_id":39,"abbreviation":"OH","value":6},{"_id":"58af33568e601381024b13f4","state":"Oklahoma","state_id":40,"abbreviation":"OK","value":4},{"_id":"58af33568e601381024b13f5","state":"Oregon","state_id":41,"abbreviation":"OR","value":26},{"_id":"58af33568e601381024b13f6","state":"Pennsylvania","state_id":42,"abbreviation":"PA","value":27},{"_id":"58af33568e601381024b13f7","state":"Rhode Island","state_id":44,"abbreviation":"RI","value":10},{"_id":"58af33568e601381024b13f8","state":"South Carolina","state_id":45,"abbreviation":"SC","value":18},{"_id":"58af33568e601381024b13f9","state":"South Dakota","state_id":46,"abbreviation":"SD","value":29},{"_id":"58af33568e601381024b13fa","state":"Tennessee","state_id":47,"abbreviation":"TN","value":13},{"_id":"58af33568e601381024b13fb","state":"Texas","state_id":48,"abbreviation":"TX","value":27},{"_id":"58af33568e601381024b13fc","state":"Utah","state_id":49,"abbreviation":"UT","value":24},{"_id":"58af33568e601381024b13fd","state":"Vermont","state_id":50,"abbreviation":"VT","value":5},{"_id":"58af33568e601381024b13fe","state":"Virginia","state_id":51,"abbreviation":"VA","value":4},{"_id":"58af33568e601381024b13ff","state":"Washington","state_id":53,"abbreviation":"WA","value":16},{"_id":"58af33568e601381024b1400","state":"West Virginia","state_id":54,"abbreviation":"WV","value":22},{"_id":"58af33568e601381024b1401","state":"Wisconsin","state_id":55,"abbreviation":"WI","value":19},{"_id":"58af33568e601381024b1402","state":"Wyoming","state_id":56,"abbreviation":"WY","value":28}];

export default class UsMap extends React.Component {
	constructor(props) {
		super(props);

        this.resizeFunc = this.resize.bind(this);

        this.geometry = usStates.features;
        this.data = fakeData;

		this.state = {
            width: 0,
            height: 0,
            currHovered: null,
            tooltipSettings: null,
            currFilter: props.filters[0]
        }
	}

	componentDidMount() {
        $(window).resize(this.resizeFunc);

        const chart = this.initialize();

        let w = this.getCurrWidth();
        this.setState({
            chart: chart,
            width: w,
            height: 3*w/5
        })
    }

    initialize() {
        const div = new ReactFauxDOM.Element('div');
        console.log(this.state);

        this.svg = d3.select(div).append("svg");
        this.g = this.svg.append("g")
        	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.colorScale = getColorScale(this.data, this.state.currFilter);
        console.log(this.colorScale.domain());

        // this.initializeYAxes();
        // this.initializeXAxis();

        this.bindDataToGeom();
        this.initializeMap();

        return div;
    }

    initializeMap() {
        console.log(this.geometry);

        this.paths = this.g.selectAll("path")
            .data(this.geometry)
            .enter()
            .append("path")
            .attr("class", "us-map__state")
            .on("mouseover", (d, index, paths) => { return this.mouseover(d, paths[index], d3.event) })
            .on("mouseout", (d, index, paths) => { return this.mouseout(paths[index]) });
    }

    bindDataToGeom() {
        for (let dataElem of this.data) {
            let dataId = dataElem.state_id;
            for (let geogElem of this.geometry) {
                if (dataId == geogElem.id) {
                    geogElem.data = dataElem;
                    break;
                }
            }
        }
    }

    update() {
        const {width, height} = this.state;

        this.svg
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom);

        this.g
            .attr("width", width - margin.left - margin.right)
            .attr("height", height);

        this.projection = d3.geoAlbersUsa()
            .scale(5*width/4)
            .translate([width/2, height/2]);

        this.pathGenerator = d3.geoPath()
            .projection(this.projection);

        console.log(this.geometry);

        this.updateMap();
        // this.updateXAxis();
        // this.updateDataElements();
    }

    updateMap() {
        this.paths
            .attr("d", (d) => { return this.pathGenerator(d); })
            .attr("fill", (d) => { return this.setFill(d); });
    }




    toggleVals(valsShown) {
        console.log(valsShown)
    	this.setState({
            valsShown: valsShown
        });
    }

	render() {
		// const { data, settings } = this.props,
  //           {chart1Settings, chart2Settings} = settings;

        let content, legend, tooltip, missingVarsList, presentVarsList;
        // let variables = chart1Settings.variables;

        // if (chart2Settings) {
        //     variables = variables.concat(chart2Settings.variables);
        // }

		if (this.state.chart) {
            this.update();
            content = this.state.chart.toReact();
            // legend = <Legend variables={variables} toggleChartVals={this.toggleVals.bind(this)}/>;
            tooltip = <Tooltip settings={this.state.tooltipSettings} />
        } else {
            content = "loading chart";
        }
		return (
            <div className="data-block__viz__rendering-area" ref="renderingArea">
                {content}
                {tooltip}
                
            </div>
        )
	}

	resize() {
        let w = this.getCurrWidth();
        this.setState({
          width: w,
          height: 3*w/5
        })
        console.log("resizing!");
    }

    componentWillUnmount() {
        $(window).off("resize", this.resizeFunc);
    }

    // callback functions

    mouseover(datum, path, eventObject) {
        console.log(datum);
    	this.setState({
            currHovered: {varName: datum.state_id, year: datum.year},
            tooltipSettings: {
                x: eventObject.offsetX + 10,
                y: eventObject.offsetY - 30,
                title: datum.data.state,
                value: datum.data[this.state.currFilter.variable],
                format: this.state.currFilter.format
            }
        })
    }

    mouseout() {
    	this.setState({
            currHovered: null,
            tooltipSettings: null
        })
    }

	// helper functions
	getCurrWidth() {
        return $(this.refs.renderingArea).width() - margin.left - margin.right;
    }

    setFill(d) {
        if (d.data) {
            var value = d.data[this.state.currFilter.variable];
            return value ? this.colorScale(value) : "green";
        } else {
            return "green";
        }
    }
}