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

		this.state = {
            width: 0,
            height: 0,
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

    componentWillReceiveProps(nextProps) {
        console.log("UPDATING!!!!")
        console.log(this.props, nextProps)

        if (this.props.filter.variable != nextProps.filter.variable) {
            this.filterChanged(nextProps);
        }
    }

    initialize() {
        const div = new ReactFauxDOM.Element('div');
        console.log(this.state);

        this.svg = d3.select(div).append("svg");
        this.g = this.svg.append("g")
        	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // this.bindDataToGeom();
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

    // bindDataToGeom() {
    //     console.log(this.props.data)
    //     for (let dataElem of this.props.data) {
    //         let dataId = dataElem.state_id;
    //         console.log(dataId)
    //         for (let geogElem of this.geometry) {
    //             if (dataId == geogElem.id) {
    //                 geogElem.data = dataElem;
    //                 break;
    //             }
    //         }
    //     }
    //     console.log(this.geometry)
    // }

    filterChanged(nextProps) {

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
            .attr("fill-opacity", (d) => { 
                if (currHovered && currHovered == d.id) {
                    return ".5";
                } else {
                
                    return "1";
                }
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
        const {filter, hoverChangeFunc} = this.props;
        console.log(datum)
        let dataVal = this.getDataPoint(datum.id)
        console.log(dataVal)
        hoverChangeFunc(datum.id);
        let varSettings = filter;
        varSettings.color = dataVal && dataVal[filter.variable] ? this.props.colorScale(dataVal[filter.variable]) : colors.grey.light

        console.log(varSettings)
        
    	this.setState({
            tooltipSettings: {
                x: eventObject.offsetX + 20,
                y: eventObject.offsetY - 30,
                renderingAreaWidth: this.state.width,
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
	getCurrWidth() {
        return $(this.refs.renderingArea).width() - margin.left - margin.right;
    }

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
                return value ? colorScale(value) : colors.grey.light;
            } 
        }

        return colors.grey.light;
    }
}