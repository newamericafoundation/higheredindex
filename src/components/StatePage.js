'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import statesMenu from './statesMenu';
import Medal from './Medal';
import Flag from './Flag';
import $ from 'jquery';

export default class StatePage extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
      this.loadData();
  }

  loadData() {
    console.log("loading data");
      const query = this.props.location.query || {};
      const filter = {
        // priority: query.priority,
        // status: query.status,
      };
      $.ajax({
        url: 'http://localhost:3000/api/states/' + this.props.params.id,
        data: filter,
        dataType: 'json',
        cache: false,
        success: function loadDataSuccess(data) {
          console.log(data);
          this.setState({ stateName: data });
        }.bind(this),
        error: function loadDataError(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this),
      });
  }
  render() {
    const stateName = this.state.stateName;
    console.log(stateName);
    if (!stateName) {
      return <NotFoundPage/>;
    }
    return (
      <div className="state-full">
        <div className="state">
          <header />
          <div className="picture-container">
            <h2 className="name">{stateName.name}</h2>
          </div>
        </div>
        <div className="navigateBack">
          <Link to="/">« Back to the index</Link>
        </div>
      </div>
    );
  }
}
