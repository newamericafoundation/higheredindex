import fetch from 'isomorphic-fetch'

/*
 * action types
 */

export const CHANGE_CURR_PROFILE = 'CHANGE_CURR_PROFILE'

export const REQUEST_PROFILE = 'REQUEST_PROFILE'
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE'
export const REQUEST_PROFILE_LIST = 'REQUEST_PROFILE_LIST'
export const RECEIVE_PROFILE_LIST = 'RECEIVE_PROFILE_LIST'
export const REQUEST_PROFILE_PHOTO = 'REQUEST_PROFILE_PHOTO'
export const RECEIVE_PROFILE_PHOTO = 'RECEIVE_PROFILE_PHOTO'

// export const REQUEST_INST = 'REQUEST_INST'
// export const RECEIVE_INST = 'RECEIVE_INST'
// export const REQUEST_INST_LIST = 'REQUEST_INST_LIST'
// export const RECEIVE_INST_LIST = 'RECEIVE_INST_LIST'

/*
 * action creators
 */

export function changeCurrProfile(name, profileType) {
  return { 
  	type: CHANGE_CURR_PROFILE, 
  	profileType, 
  	name 
  }
}

export function requestProfile(name, profileType) {
   return { 
  	type: REQUEST_PROFILE, 
  	profileType, 
  	name 
   }
}

export function receiveProfile(name, profileType, json) {
	return { 
	  	type: RECEIVE_PROFILE, 
	  	name,
	  	profileType, 
	  	data: json
   	}
}

export function fetchProfile(name, profileType) {
	console.log(name);

  return function (dispatch) {

    dispatch(changeCurrProfile(name, profileType))
    dispatch(requestProfile(name, profileType))

    return fetch('http://localhost:3000/api/' + profileType + 's/' + name)
      .then(response => { return response.json()})
      .then(json => {
      	console.log("this is the json response")
      	console.log(json);
        
        dispatch(receiveProfile(name, profileType, json))
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

export function requestProfilePhoto(name, profileType) {
   return { 
		type: REQUEST_PROFILE_PHOTO, 
		profileType, 
		name 
   }
}

export function receiveProfilePhoto(name, profileType, photo) {
	return { 
	  	type: RECEIVE_PROFILE_PHOTO, 
	  	name,
	  	profileType, 
	  	photo
   	}
}

export function fetchProfilePhoto(name, profileType) {
  console.log(name);

  return function (dispatch) {
    dispatch(requestProfilePhoto(name, profileType))

    const query = 'tufts+university';
    
    return fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAAOs74dO146kO2Tp-JXOIwLrACTDcAmRC2h7EZwHw-xtVTBzY8ksOqkL3lzjlViZzte1uQio66CuP-nXtroFF8cWdxsVofY4XO8w9Cyi1tIIlLsS8D9B48YieXpKD3xuu1fkCfJLIqZCaef6q06S-rfv71VsruTRGstrx5t4OoH9zEhA99CGYpv8rpH34gVUP5A-DGhSzg-cO_KA35lMJqktobXwr7UQ6vA&key=AIzaSyBwiCv57aVHoDiIaY-zTFfQTWLq4ForFuM')
      .then(response => { return response.json()})
      .then(json => {
        console.log("this is the json response")
        console.log(json);
        
        dispatch(receiveProfilePhoto(name, profileType, photo))
      })

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}
