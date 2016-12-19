'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSectionTitle from './ProfileSectionTitle.jsx';
import ProfileHeader from './ProfileHeader.jsx';
import DataBlock from './DataBlock';


const StPage = (props) => {
  console.log("in stPage, parameter is: ");
  console.log(props)
  if (!props.stData) {
    return <NotFoundPage/>;
  }
  return (
    <div className="location-profile state">
      <ProfileHeader id={ props.stData.path } name={ props.stData.name }/>
      <SectionNav />
      <ProfileSectionTitle 
        title="Students" 
        subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>
      <DataBlock title="Enrollment by Student Type" 
        paragraphText={['', 'institutions enrolled', 'undergraduate students and', 'graduate students;', 'full-time students and', 'part-time-students; and', 'adult education students in @year']}
        paragraphFields={['name', 'data_1999', 'data_2000', 'data_2001', 'data_2002', 'data_2003']} 
        data={props.stData}/>
      <ProfileSectionTitle 
        title="Loans" 
        subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>
      <ProfileSectionTitle 
        title="Grants" 
        subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>
      <ProfileSectionTitle 
        title="Schools" 
        subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>
      <ProfileSectionTitle 
        title="Outcomes" 
        subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>

      <div className="navigateBack">
        <Link to="/">« Back to the index</Link>
      </div>
    </div>
  );
}

export default StPage;

