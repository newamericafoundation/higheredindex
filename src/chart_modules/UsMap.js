import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
var d3 = require("d3");
import $ from 'jquery';
import LegendQuantize from "../components/LegendQuantize.js";
import Tooltip from "../components/Tooltip.js";
import { formatValue } from "../helper_functions/format_value.js";
import { colors } from "../helper_functions/colors.js";
import { usStates } from './us-states.js';

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
            valsShown: Array.from(Array(props.filter.numBins).keys()),
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
            .attr("stroke", "white")
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
        const {currHovered} = this.props;
        this.paths
            .attr("d", (d) => { return this.pathGenerator(d); })
            .attr("fill", (d) => { return this.setFill(d); })
            .attr("stroke-width", (d) => { 
                if (d.data) {
                    if (currHovered && currHovered == d.data.state_id) {
                        return "5px";
                    }
                }
                return "1px";
            });
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
            legend = <LegendQuantize colorScale={this.props.colorScale} numBins={this.props.filter.numBins} format={this.props.filter.format} toggleChartVals={this.toggleVals.bind(this)}/>;
            tooltip = <Tooltip settings={this.state.tooltipSettings} />
        } else {
            content = "loading chart";
        }
		return (
            <div className="data-block__viz__rendering-area" ref="renderingArea">
                {content}
                {legend}
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
        const {filter, hoverChangeFunc} = this.props;
        hoverChangeFunc(datum.data.state_id);
    	this.setState({
            tooltipSettings: {
                x: eventObject.offsetX + 10,
                y: eventObject.offsetY - 30,
                title: datum.data.state,
                value: datum.data[filter.variable],
                format: filter.format
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
	getCurrWidth() {
        return $(this.refs.renderingArea).width() - margin.left - margin.right;
    }

    setFill(d) {
        const {currHovered, colorScale, filter} = this.props;
        
        if (d.data) {
            var value = d.data[filter.variable];
            let binIndex = colorScale.range().indexOf(colorScale(value));
            if (this.state.valsShown.indexOf(binIndex) > -1) {
                return value ? colorScale(value) : "white";
            } 
        } else {
            return "white";
        }

        return colors.grey.light;
    }
}