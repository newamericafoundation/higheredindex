import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Table from "../chart_modules/Table";
import SimpleChart from "./SimpleChart";

import $ from 'jquery';


export default class DataBlockViz extends React.Component {
  render() {
  	const {settings, data} = this.props;

    console.log(settings)
    return (
    	<div className="data-block__viz">
        {(settings.chart1Settings.type == "line-chart" || settings.chart1Settings.type == "bar-chart" || settings.chart1Settings.type == "grouped-bar-chart") &&
          <SimpleChart settings={settings} data={data} /> }
        {settings.chart1Settings.type == "table" &&
          <Table settings={settings} data={data} /> }
    	</div>
    )
  }
}