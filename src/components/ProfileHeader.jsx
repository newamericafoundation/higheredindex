import React from 'react';
import { connect } from 'react-redux';
import { fetchProfilePhoto } from '../actions'

import $ from 'jquery';

class ProfileHeader extends React.Component {

	componentWillMount() {
		const { dispatch, fetchedPhotos, profileType, path } = this.props
		
		if (!fetchedPhotos[path]) {
			dispatch(fetchProfilePhoto(path, profileType))
		}
	}
	render() {
		console.log(this.props);
		const { fetchedPhotos, name, path } = this.props
		this.photoUrl = fetchedPhotos[path].photoUrl
		console.log(this.photoUrl);
		var divStyle = {
            backgroundImage: 'url(' + this.photoUrl + ')'
        }
		return (
			<div className="location-profile__title-container" style={divStyle}>
				<h2 className="location-profile__title">{name}</h2>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	const profileType = state.currProfile.type;
	const fetchedPhotos = profileType == "state" ? state.fetchedStPhotos : state.fetchedInstPhotos
  return {
  	profileType: profileType,
    fetchedPhotos: fetchedPhotos || {},
  }
}

export default connect(mapStateToProps)(ProfileHeader)