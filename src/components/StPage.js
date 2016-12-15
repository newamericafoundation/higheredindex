'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSection from './ProfileSection.jsx';
import ProfileHeader from './ProfileHeader.jsx';


const StPage = (props) => {
  console.log("in stPage, parameter is: ");
  console.log(props)
  if (!props.stData) {
    return <NotFoundPage/>;
  }
  return (
    <div className="location-profile state">
      <ProfileHeader path={ props.stData.path } name={ props.stData.name }/>
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

