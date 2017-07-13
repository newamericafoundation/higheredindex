import React from 'react';
import { connect } from 'react-redux';
import { fetchProfilePhoto } from '../actions'
import SvgIcon from './SvgIcon'
let d3 = require("d3");

import $ from 'jquery';

const indicatorImageUrl = "https://s3-us-west-2.amazonaws.com/na-data-projects/images/febp_ed-index/indicator_images/";

class ProfileHeader extends React.Component {

	componentWillMount() {
		const { dispatch, fetchedPhotos, profileType, id } = this.props
		
		if (profileType != "indicator" && !fetchedPhotos[id]) {
			dispatch(fetchProfilePhoto(id, profileType))
		}
	}
	render() {	
		const { fetchedPhotos, name, id, profileType } = this.props
		let divStyle = {};
		if (profileType == "indicator") {
			divStyle ={
	            backgroundImage: 'url(' + indicatorImageUrl + (Math.random() * 30 | 0) + '.jpg)'
	        }
  		} else if (fetchedPhotos[id] && !fetchedPhotos[id].isFetching) {
  			this.photoUrl = fetchedPhotos[id].photoUrl;
  			if (this.photoUrl) {
				divStyle.backgroundImage = 'url(' + this.photoUrl + ')';
		    } else {
		    	divStyle.backgroundImage = "url('../img/school.jpg')";
		    }
		}

		return (
			<div className="profile-header-wrapper">
				<div className="profile-header" style={divStyle}>
					<div className="profile-header__content">
						<div className="profile-header__icon"> 
							<SvgIcon name={profileType} />
						</div>
						<h2 className="profile-header__text">{name}</h2>
					</div>
				</div>
				<div className="profile-header__overlay"></div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	
	const profileType = state.currProfile.type;
	const fetchedPhotos = profileType == "state" ? state.fetchedStPhotos : state.fetchedInstPhotos
  return {
  	profileType: profileType,
    fetchedPhotos: fetchedPhotos || {},
  }
}

export default connect(mapStateToProps)(ProfileHeader)