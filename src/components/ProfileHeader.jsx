import React from 'react';
import { connect } from 'react-redux';
import { fetchProfilePhoto } from '../actions'

import $ from 'jquery';

class ProfileHeader extends React.Component {

	componentWillMount() {
		const { dispatch, fetchedStPhotos, name } = this.props

		if (fetchedStPhotos[name]) {
			this.photo = fetchedStPhotos[name]
		} else {
			dispatch(fetchProfilePhoto(name, "state"))
		}
	}
	render() {
		console.log(this.props);
		return (
			<div className="location-profile__title-container">
				<h2 className="location-profile__title">{this.props.name}</h2>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    fetchedStPhotos: state.fetchedStPhotos || {}
  }
}

export default connect(mapStateToProps)(ProfileHeader)