import React from 'react';
import { connect } from 'react-redux';
import { fetchProfilePhoto } from '../actions'

import $ from 'jquery';

class ProfileHeader extends React.Component {

	componentWillMount() {
		const { dispatch, fetchedPhotos, profileType, id } = this.props
		
		if (!fetchedPhotos[id]) {
			dispatch(fetchProfilePhoto(id, profileType))
		}
	}
	render() {	
		const { fetchedPhotos, name, id } = this.props

  		if (fetchedPhotos[id] && !fetchedPhotos[id].isFetching) {
  			this.photoUrl = fetchedPhotos[id].photoUrl || ""
			const divStyle ={
	            backgroundImage: 'url(' + this.photoUrl + ')'
	        }
			return (
				<div className="profile-header" style={divStyle}>
					<h2 className="profile-header__text">{name}</h2>
				</div>
			)
		} else {
			return (
				<div className="profile-header">
					<h2 className="profile-header__text black">{name}</h2>
				</div>
			)
		}
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