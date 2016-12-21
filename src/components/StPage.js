'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSectionTitle from './ProfileSectionTitle.jsx';
import ProfileHeader from './ProfileHeader.jsx';
import DataBlock from './DataBlock';
import stVizSettings from './stVizSettings';

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
      <div>
        {stVizSettings.map((settings, i) => {
          console.log(i)
          return <DataBlock key={i} settings={settings} data={props.stData} />;
        })}
      </div>
      <div className="navigateBack">
        <Link to="/">« Back to the index</Link>
      </div>
    </div>
  );
}

export default StPage;

