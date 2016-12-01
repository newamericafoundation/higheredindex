'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class StatesMenu extends React.Component {
  constructor() {
    super();
    this.state = {
        states: [],

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
        url: 'http://localhost:3000/api/states',
        data: filter,
        dataType: 'json',
        cache: false,
        success: function loadDataSuccess(data) {
          console.log(data);
          this.setState({ states: data });
        }.bind(this),
        error: function loadDataError(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this),
      });
  }
  render() {
    return (
      <nav className="states-menu">
        {this.states.state.map(menuState => {
          return <Link key={menuState.id} to={`/state/${menuState.id}`} activeClassName="active">
            {menuState.name}
          </Link>;
        })}
      </nav>
    );
  }
}
