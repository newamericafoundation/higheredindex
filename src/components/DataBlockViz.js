import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import StateMap from "../chart_modules/StateMap";
import Table from "../chart_modules/Table";
import SimpleChart from "./SimpleChart";
import DataBlockSectorSelector from "./DataBlockSectorSelector";

import $ from 'jquery';


export default class DataBlockViz extends React.Component {
  constructor(props) {
    super(props)



    this.state = {
      sector: props.collectionName == "states_schools" && props.settings.chart1Settings.type != "table" ? "all" : null
    }
  }

  changeSector(newSector) {
    console.log(newSector)
    this.setState({
      sector: newSector
    })
  }

  render() {
  	const {settings, data, collectionName} = this.props;
    const {sector} = this.state

    let currData = data;

    console.log(settings, collectionName)
    if (data) {
      if (sector) {
        currData = data[sector] 
      }
      return (
      	<div className="data-block__viz">
          {sector && 
            <DataBlockSectorSelector fullData={data} changeFunction={this.changeSector.bind(this)} />}
          {(settings.chart1Settings.type == "line-chart" || settings.chart1Settings.type == "bar-chart" || settings.chart1Settings.type == "grouped-bar-chart") &&
            <SimpleChart settings={settings} data={currData} /> }
          {settings.chart1Settings.type == "table" &&
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