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

export default class UsMap extends React.Component {
	constructor(props) {
		super(props);

        this.resizeFunc = this.resize.bind(this);

        this.geometry = usStates.features;

        this.data = props.data;

		this.state = {
            width: 0,
            height: 0,
            currHovered: null,
            tooltipSettings: null,
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

        this.colorScale = this.props.colorScale;
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
                value: datum.data[this.props.filter.variable],
                format: this.props.filter.format
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
            var value = d.data[this.props.filter.variable];
            return value ? this.colorScale(value) : "green";
        } else {
            return "green";
        }
    }
}