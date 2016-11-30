'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import AthletesMenu from './AthletesMenu';
import Medal from './Medal';
import Flag from './Flag';
import $ from 'jquery';

export default class AthletePage extends React.Component {
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
        url: '/api/athletes/' + this.props.params.id,
        data: filter,
        dataType: 'json',
        cache: false,
        success: function loadDataSuccess(data) {
          console.log(data);
          this.setState({ athlete: data });
        }.bind(this),
        error: function loadDataError(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this),
      });
  }
  render() {
    const athlete = this.state.athlete;
    if (!athlete) {
      return <NotFoundPage/>;
    }
    const headerStyle = { backgroundImage: `url(/img/${athlete.cover})` };
    return (
      <div className="athlete-full">
        <AthletesMenu/>
        <div className="athlete">
          <header style={headerStyle}/>
          <div className="picture-container">
            <img src={`/img/${athlete.image}`}/>
            <h2 className="name">{athlete.name}</h2>
          </div>
          <section className="description">
            Olympic medalist from <strong><Flag code={athlete.country} showName="true"/></strong>,
            born in {athlete.birth} (Find out more on <a href={athlete.link} target="_blank">Wikipedia</a>).
          </section>
        </div>
        <div className="navigateBack">
          <Link to="/">« Back to the index</Link>
        </div>
      </div>
    );
  }
}
