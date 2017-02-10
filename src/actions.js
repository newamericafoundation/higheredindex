import fetch from 'isomorphic-fetch'

/*
 * action types
 */

export const TOGGLE_MENU_EXPANSION = 'TOGGLE_MENU_EXPANSION'
export const CHANGE_CURR_PROFILE = 'CHANGE_CURR_PROFILE'
export const REQUEST_PROFILE = 'REQUEST_PROFILE'
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE'
export const REQUEST_PROFILE_LIST = 'REQUEST_PROFILE_LIST'
export const RECEIVE_PROFILE_LIST = 'RECEIVE_PROFILE_LIST'
export const REQUEST_PROFILE_PHOTO = 'REQUEST_PROFILE_PHOTO'
export const RECEIVE_PROFILE_PHOTO = 'RECEIVE_PROFILE_PHOTO'
export const TOGGLE_TOP_NAV_PROFILE_NAME = 'TOGGLE_TOP_NAV_PROFILE_NAME'

// export const REQUEST_INST = 'REQUEST_INST'
// export const RECEIVE_INST = 'RECEIVE_INST'
// export const REQUEST_INST_LIST = 'REQUEST_INST_LIST'
// export const RECEIVE_INST_LIST = 'RECEIVE_INST_LIST'
let GoogleMapsLoader = require('google-maps');
let googlePlacesService; 
GoogleMapsLoader.LIBRARIES = ['places'];
GoogleMapsLoader.KEY = 'AIzaSyBwiCv57aVHoDiIaY-zTFfQTWLq4ForFuM';
GoogleMapsLoader.load(function(google) {
  googlePlacesService = new google.maps.places.PlacesService(document.createElement('div'));
});


/*
 * action creators
 */

export function toggleMenuExpansion(setExpansionState) {
  return { 
    type: TOGGLE_MENU_EXPANSION, 
    setExpansionState: setExpansionState
  }
}

export function changeCurrProfile(id, name, profileType) {
  console.log(name);
  return { 
  	type: CHANGE_CURR_PROFILE, 
  	profileType,
    id,
  	name
  }
}

export function toggleTopNavProfileName(newSetting) {
  return {
    type: TOGGLE_TOP_NAV_PROFILE_NAME,
    newSetting: newSetting
  }
}

export function requestProfile(id, profileType) {
   return { 
  	type: REQUEST_PROFILE, 
  	profileType, 
  	id 
   }
}

export function receiveProfile(id, profileType, json) {
	return { 
	  	type: RECEIVE_PROFILE, 
	  	id,
	  	profileType, 
	  	data: json
   	}
}

export function fetchProfile(id, profileType) {
	console.log(id);

  return function (dispatch) {

    dispatch(requestProfile(id, profileType))

    return fetch('http://localhost:3000/api/' + profileType + 's/' + id)
      .then(response => { return response.json()})
      .then(json => {
      	console.log("this is the json response")
      	console.log(json);

        dispatch(changeCurrProfile(id, json.name, profileType))
        dispatch(receiveProfile(id, profileType, json))
      })

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}

export function requestProfileList(listType) {
	return { type: REQUEST_PROFILE_LIST }
}

export function receiveProfileList(listType, json) {
	return { 
		type: RECEIVE_PROFILE_LIST,
		listType: listType,
		list: json
	}
}

export function fetchProfileList(type) {
  console.log("fetching " + type);
  return function (dispatch) {

    dispatch(requestProfileList(type))

    return fetch('http://localhost:3000/api/' + type + '-list/')
      .then(response => { return response.json()})
      .then(json => {
      	console.log("this is the json response")
      	console.log(json);
      	json.map((d) => {
      		d.type = type;
      		return d;
      	})
        dispatch(receiveProfileList(type, json))
      })
  }
}

  

export function fetchProfilePhoto(id, profileType) {
  console.log(id);

  return function (dispatch) {

    dispatch(requestProfilePhoto(id, profileType))
    const params = {
      query: id
    }
    return googlePlacesService.textSearch(params, (results, status) => {
      let photoUrl = results[0].photos[0].getUrl({'maxWidth': 1500, 'maxHeight': 1500});
      dispatch(receiveProfilePhoto(id, profileType, photoUrl))
    });

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}


export function requestProfilePhoto(id, profileType) {
   return { 
		type: REQUEST_PROFILE_PHOTO, 
		profileType, 
		id 
   }
}

export function receiveProfilePhoto(id, profileType, photoUrl) {
	return { 
	  	type: RECEIVE_PROFILE_PHOTO, 
	  	id,
	  	profileType, 
	  	photoUrl
   	}
}
