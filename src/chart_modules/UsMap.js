import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { browserHistory } from 'react-router';
var d3 = require("d3");
import $ from 'jquery';
import LegendQuantize from "../components/LegendQuantize.js";
import Tooltip from "../components/Tooltip.js";
import { formatValue } from "../helper_functions/format_value.js";
import { colors } from "../helper_functions/colors.js";
import { usStates } from './us-states.js';

let margin = {top: 10, right: 0, bottom: 30, left: 0};

export default class UsMap extends React.Component {
	constructor(props) {
		super(props);

        this.geometry = usStates.features;

		this.state = {
            tooltipSettings: null,
        }
	}

	componentDidMount() {
        const chart = this.initialize();
        this.setState({
            chart: chart,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filter.variable != nextProps.filter.variable) {
            this.filterChanged(nextProps);
        }
    }

    initialize() {
        const div = new ReactFauxDOM.Element('div');

        this.svg = d3.select(div).append("svg");
        this.g = this.svg.append("g")
        	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // this.bindDataToGeom();
        this.initializeMap();

        return div;
    }

    initializeMap() {
        this.paths = this.g.selectAll("path")
            .data(this.geometry)
            .enter()
            .append("path")
            .attr("class", "us-map__state")
            .attr("stroke", "white")
            .on("mouseover", (d, index, paths) => { return this.mouseover(d, paths[index], d3.event) })
            .on("mouseout", (d, index, paths) => { return this.mouseout(paths[index]) })
            .on("click", (d) => { browserHistory.push("/state/" + d.properties.path) })
    }

    filterChanged(nextProps) {

    }

    update() {
        const {width, height} = this.props;

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

        this.updateMap();
        // this.updateXAxis();
        // this.updateDataElements();
    }

    updateMap() {
        const {currHovered} = this.props;
        this.paths
            .attr("d", (d) => { return this.pathGenerator(d); })
            .attr("fill", (d) => { return this.setFill(d); })
            .style("pointer-events", (d) => { return this.setFill(d) == colors.grey.light ? "none" : "auto"; })
            // .attr("fill-opacity", (d) => { 
            //     if (currHovered && currHovered == d.id) {
            //         return ".5";
            //     } else {
                
            //         return "1";
            //     }
            // });
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

	

    

    // callback functions

    mouseover(datum, path, eventObject) {
        const {filter, hoverChangeFunc, width} = this.props;
        let dataVal = this.getDataPoint(datum.id)
        hoverChangeFunc(datum.id);
        let varSettings = {};
        Object.assign(varSettings, filter);
        varSettings.color = dataVal && dataVal[filter.variable] ? this.props.colorScale(dataVal[filter.variable]) : colors.grey.light
        
    	this.setState({
            tooltipSettings: {
                x: eventObject.offsetX + 20,
                y: eventObject.offsetY - 30,
                renderingAreaWidth: width,
                title: datum.properties.name,
                valArray: dataVal ? [{ variable: varSettings, value: dataVal[filter.variable] }] : [],
            }
        })
    }

    mouseout() {
        const {hoverChangeFunc} = this.props;
        hoverChangeFunc(null);
    	this.setState({
            tooltipSettings: null
        })
    }

	// helper functions
	
    getDataPoint(id) {
        let retVal;
        this.props.data.forEach((d) => {
            if (d.state_id === id) {
                retVal = d;
                return;
            }
        })

        return retVal;
    }

    setFill(d) {
        const {currHovered, valsShown, colorScale, filter} = this.props;

        let dataPoint = this.getDataPoint(d.id);

        if (dataPoint) {
            let value = dataPoint[filter.variable];
            let binIndex = colorScale.range().indexOf(colorScale(value));
            if (valsShown.indexOf(binIndex) > -1) {
                if (!currHovered || (currHovered && currHovered == d.id)) {
                    return value ? colorScale(value) : colors.grey.medium;
                } else {
                    return colors.grey.medium;
                }
            }
        }

        return colors.grey.light;
    }
}