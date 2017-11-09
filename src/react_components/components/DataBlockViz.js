import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';

import StateMap from "../chart_modules/StateMap";
import Table from "../chart_modules/Table";
import SimpleChart from "../chart_modules/SimpleChart";

export default class DataBlockViz extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	const {settings, data, collectionName} = this.props;
    
    let currData = data;

    if (currData) {
      return (
      	<div className="data-block__viz">
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