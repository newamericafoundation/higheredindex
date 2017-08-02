import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux'
var d3 = require("d3");
import $ from 'jquery';
import LegendQuantize from "../components/LegendQuantize.js";
import Tooltip from "../components/Tooltip.js";
import { formatValue } from "../helper_functions/format_value.js";
import { colors } from "../helper_functions/colors.js";
import { getColorScale } from "../helper_functions/get_color_scale.js";

import { congressionalDistricts } from './congressional-districts.js';
import { statePlane } from './d3-geo-state-plane.js';
import { stateIdMappings } from './state-id-mappings.js';
import { fetchCongDistrictInfo } from '../actions.js';
let topojson = require('topojson');

let margin = {top: 0, right: 0, bottom: 0, left: 0};

class StateMap extends React.Component {
	constructor(props) {
		super(props);

        this.resizeFunc = this.resize.bind(this);

        this.districtGeom = {
            type: "GeometryCollection",
            geometries: congressionalDistricts.objects.cb_2016_us_cd115_500k.geometries.slice()
        }

        // this.data = props.data;

		this.state = {
            width: 0,
            height: 0,
            currHovered: null,
            tooltipSettings: null,
        }
	}

    componentWillMount() {
        const {getCongDistrictInfo, fetchedCongDistrictInfo} = this.props;

        if (!fetchedCongDistrictInfo[this.props.data.state]) {
            getCongDistrictInfo(this.props.data.state);
        }
    }

	componentDidMount() {
        $(window).resize(this.resizeFunc);

        let w = this.getCurrWidth();
        this.setState({
            width: w,
            height: 3*w/5
        })
    }

    componentDidUpdate(prevProps) {
        if (!this.state.chart && this.props.fetchedCongDistrictInfo[this.props.data.state] && this.props.fetchedCongDistrictInfo[this.props.data.state] != "fetching") {
            console.log("CALLING INITIALIZE", this.props.fetchedCongDistrictInfo)
            this.districtCounts = this.props.fetchedCongDistrictInfo[this.props.data.state];
            const chart = this.initialize();
            
            this.setState({
                chart: chart
            })
        }
    }

    initialize() {
        const div = new ReactFauxDOM.Element('div');
        console.log(this.state);

        this.svg = d3.select(div).append("svg");
        this.g = this.svg.append("g")
        	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.filterVar = {variable:"count", displayName: "Count", format: "number", scaleType:"quantize", numBins: 5, customRange:[colors.white, colors.turquoise.light, colors.turquoise.dark]}

        this.colorScale = getColorScale(
            this.districtCounts, 
            this.filterVar
        )

        let stateId = String(this.districtCounts[0]._id).slice(0, -2);

        this.districtGeom.geometries = this.districtGeom.geometries.filter((geoElem) => { console.log(geoElem); return parseInt(geoElem.properties.STATEFP, 10) == stateId})

        this.paths = this.svg.append("g")
              .attr("class", "districts")
            .selectAll("path")
              .data(topojson.feature(congressionalDistricts, this.districtGeom).features)
            .enter().append("path")
              .attr("stroke", "white")
              .attr("stroke-width", .5)
              .on("mouseover", (d) => { return this.mouseover(d, d3.event); })
              .on("mouseout", (d) => { return this.mouseout(); })

        return div;
    }

    update() {
        const {width, height} = this.state;

        this.svg
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom);

        this.g
            .attr("width", width - margin.left - margin.right)
            .attr("height", height);

        console.log(width, height)

        this.projection = statePlane(this.props.data.state, width, height);

        this.pathGenerator = d3.geoPath()
            .projection(this.projection);


        this.updateMap();
    }

    updateMap() {
        const {currHovered} = this.props;

        console.log(congressionalDistricts)
        this.paths
              .attr("d", this.pathGenerator)
              .attr("fill", (d) => { return this.colorScale(this.getDistrictCount(d)); })
              .attr("fill-opacity", (d) => { console.log(d.properties.GEOID, this.state.currHovered); return d.properties.GEOID === this.state.currHovered ? .7 : 1 });
    }

	render() {
        let content, legend, tooltip;
       
		if (this.state.chart) {
            this.update();
            content = this.state.chart.toReact();
            tooltip = <Tooltip settings={this.state.tooltipSettings} />
            let legendVar = {numBins: 5}
            legend = <LegendQuantize filter={this.filterVar} colorScale={this.colorScale} toggleVals={null} />
        } else {
            content = "loading chart";
        }
		return (
            <div className="data-block__viz__rendering-area" ref="renderingArea">
                {content}
                {tooltip}
                {legend}
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

    mouseover(datum, eventObject) {
        console.log(eventObject, this.props)
        let districtCount = this.getDistrictCount(datum);
        this.paths
            .attr("fill-opacity", (d) => { return d == datum ? .7 : 1 })
            .attr("stroke-width", (d) => { return d == datum ? 2 : .5 })
    	this.setState({
            currHovered: datum.properties.GEOID,
            tooltipSettings: {
                x: eventObject.offsetX + 40,
                y: eventObject.offsetY - 30,
                renderingAreaWidth: this.state.width,
                title: this.props.data.state + " - " + datum.properties.CD115FP,
                valArray: [{ variable: { displayName:"Count", format:"number", color: this.colorScale(districtCount)}, value: districtCount }]
            }
        })
    }

    mouseout() {
        this.paths
            .attr("fill-opacity", 1)
            .attr("stroke-width", .5)
    	this.setState({
            tooltipSettings: null
        })
    }

	// helper functions
	getCurrWidth() {
        return $(this.refs.renderingArea).width() - margin.left - margin.right;
    }

    getDistrictCount(d) {
        let retVal;
        this.districtCounts.forEach((district) => {
            if (district._id == d.properties.GEOID) {
                retVal = district.count;
                return;
            }
        })
        return retVal;
    }
    setFill(d) {
        const {currHovered, valsShown, colorScale, filter} = this.props;
        
        if (d.data) {
            let value = d.data[filter.variable];
            let binIndex = colorScale.range().indexOf(colorScale(value));
            if (valsShown.indexOf(binIndex) > -1) {
                return value ? colorScale(value) : "white";
            } 
        } else {
            return "white";
        }

        return colors.grey.light;
    }
}

const mapStateToProps = (state) => {
  return {
    fetchedCongDistrictInfo: state.fetchedCongDistrictInfo
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    getCongDistrictInfo: (stAbbrev) => {
      dispatch(fetchCongDistrictInfo(stAbbrev))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StateMap)

