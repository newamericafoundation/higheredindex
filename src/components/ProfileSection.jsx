'use strict';

import React from 'react';

export default function ProfileSection(props) {
	console.log(props);
	return (
    	<section className="profile-section" id={props.title.toLowerCase()}>
    		<div className="profile-section__title-container">
    			<h3 className="profile-section__title">{props.title}</h3>
    			<h5 className="profile-section__subtitle">{props.subtitle}</h5>
    		</div>
    	</section>
    );
}
