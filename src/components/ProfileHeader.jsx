import React from 'react';
import { connect } from 'react-redux';
import { fetchProfilePhoto } from '../actions'
import { Parallax } from 'react-parallax';

import $ from 'jquery';

class ProfileHeader extends React.Component {

	componentWillMount() {
		const { dispatch, fetchedPhotos, profileType, id } = this.props
		console.log(id);
		if (!fetchedPhotos[id]) {
			dispatch(fetchProfilePhoto(id, profileType))
		}
	}
	render() {
		console.log(this);
		const { fetchedPhotos, name, id } = this.props
		console.log(fetchedPhotos[id]);
		

  		if (fetchedPhotos[id] && !fetchedPhotos[id].isFetching) {
  			this.photoUrl = fetchedPhotos[id].photoUrl || ""
			console.log(this.photoUrl);
			return (
				<div>
					<Parallax className="location-profile__title-container" bgImage={this.photoUrl} strength={300}>
						<br/>
						<h2 className="location-profile__title">{name}</h2>
					</Parallax>
				</div>
			)
		} else {
			return (
				<div className="location-profile__pre-render__title-container">
					<h2 className="location-profile__pre-render__title">{name}</h2>
				</div>
			)
		}
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