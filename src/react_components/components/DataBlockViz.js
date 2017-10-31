import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';

import StateMap from "../chart_modules/StateMap";
import Table from "../chart_modules/Table";
import SimpleChart from "../chart_modules/SimpleChart";
import DataBlockSectorSelector from "./DataBlockSectorSelector";

export default class DataBlockViz extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sector: props.collectionName == "states_schools" ? "all" : null
    }
  }

  changeSector(newSector) {
    this.setState({
      sector: newSector
    })
  }

  render() {
  	const {settings, data, collectionName} = this.props;
    const {sector} = this.state

    let currData = data;

    if (sector) {
      if (settings.chart1Settings.type == "table" || settings.chart1Settings.type == "state-map") {
        currData = data ? data.all : null
      } else {
        currData = data ? data[sector] : null
      }
    }

    if (currData) {
      return (
      	<div className="data-block__viz">
          {sector && settings.chart1Settings.type != "table" && settings.chart1Settings.type != "state-map" &&
            <DataBlockSectorSelector fullData={data} changeFunction={this.changeSector.bind(this)} />}
          {(settings.chart1Settings.type == "line-chart" || settings.chart1Settings.type == "bar-chart" || settings.chart1Settings.type == "grouped-bar-chart") &&
            <SimpleChart settings={settings} data={currData} /> }
          {settings.chart1Settings.type == "table" && currData &&
            <Table settings={settings} data={currData} /> }
          {settings.chart1Settings.type == "state-map" &&
            <StateMap settings={settings} data={currData} /> }
      	</div>
      )
    } else {
      return null;
    }
  }
}