'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSection from './ProfileSection.jsx';


const StPage = (props) => {
  console.log("in stPage, parameter is: ");
  console.log(props)
  if (!props.stData) {
    return <NotFoundPage/>;
  }
  return (
    <div className="location-profile state">
      <div className="location-profile__title-container">
        <h2 className="location-profile__title">{ props.stData.name }</h2>
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

export default StPage;

