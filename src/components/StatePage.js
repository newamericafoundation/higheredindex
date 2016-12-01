'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSection from './ProfileSection.jsx';

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

      console.log(this.props.params);
      $.ajax({
        url: 'http://localhost:3000/api/states/' + this.props.params.name,
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
      <div className="location-profile state">
        <div className="location-profile__title-container">
          <h2 className="location-profile__title">{stateName.name}</h2>
        </div>
        <SectionNav />
        <ProfileSection 
          title="Students" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
        />
        <ProfileSection 
          title="Loans" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
        />
        <ProfileSection 
          title="Grants" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
        />
        <ProfileSection 
          title="Schools" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
        />
        <ProfileSection 
          title="Outcomes" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
        />

        <div className="navigateBack">
          <Link to="/">« Back to the index</Link>
        </div>
      </div>
    );
  }
}
