import fetch from 'isomorphic-fetch'
import { validateData, nestYears, addFullStateNames, addPathKeys} from './helper_functions/process_uploaded_data.js';

/*
 * action types
 */

export const TOGGLE_MENU_EXPANSION = 'TOGGLE_MENU_EXPANSION'
export const CHANGE_CURR_PROFILE = 'CHANGE_CURR_PROFILE'
export const CHANGE_CURR_PROFILE_SECTION = 'CHANGE_CURR_PROFILE_SECTION'
export const REQUEST_PROFILE = 'REQUEST_PROFILE'
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE'
export const REQUEST_PROFILE_LIST = 'REQUEST_PROFILE_LIST'
export const RECEIVE_PROFILE_LIST = 'RECEIVE_PROFILE_LIST'
export const REQUEST_DATA_INFO = 'REQUEST_DATA_INFO'
export const RECEIVE_DATA_INFO = 'RECEIVE_DATA_INFO'
export const REQUEST_PROFILE_PHOTO = 'REQUEST_PROFILE_PHOTO'
export const RECEIVE_PROFILE_PHOTO = 'RECEIVE_PROFILE_PHOTO'
export const TOGGLE_TOP_NAV_PROFILE_NAME = 'TOGGLE_TOP_NAV_PROFILE_NAME'
export const SET_INDICATOR_UPDATE_STATUS = 'SET_INDICATOR_UPDATE_STATUS'
export const UPLOAD_DATA_FILE = 'UPLOAD_DATA_FILE'
export const SET_DATA_FILE_UPLOAD_STATUS = 'SET_DATA_FILE_UPLOAD_STATUS'
export const SET_ADMIN_LOGIN_STATUS = 'SET_ADMIN_LOGIN_STATUS'
export const RECEIVE_RANKING = 'RECEIVE_RANKING'
export const REQUEST_RANKING = 'REQUEST_RANKING'
export const RECEIVE_CONG_DISTRICT_INFO = 'RECEIVE_CONG_DISTRICT_INFO'
export const REQUEST_CONG_DISTRICT_INFO = 'REQUEST_CONG_DISTRICT_INFO'
export const RECEIVE_ALL_STATES_DATA = 'RECEIVE_ALL_STATES_DATA'
export const REQUEST_ALL_STATES_DATA = 'REQUEST_ALL_STATES_DATA'
export const RECEIVE_METHODOLOGY = 'RECEIVE_METHODOLOGY'

let GoogleMapsLoader = require('google-maps');

let googlePlacesService; 
GoogleMapsLoader.LIBRARIES = ['places'];
GoogleMapsLoader.KEY = 'AIzaSyBwiCv57aVHoDiIaY-zTFfQTWLq4ForFuM';
GoogleMapsLoader.load(function(google) {
  googlePlacesService = new google.maps.places.PlacesService(document.createElement('div'));
});

// const dbPath = process.env.NODE_ENV == 'production' ? 'https://febp-backend.herokuapp.com/api/' : 'http://localhost:3000/api/';
const dbPath = 'https://febp-backend.herokuapp.com/api/';

console.log(dbPath);


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

export function changeCurrProfileSection(sectionIndex) {
  return { 
    type: CHANGE_CURR_PROFILE_SECTION, 
    sectionIndex
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

    return fetch(dbPath + profileType + '/' + id)
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

    return fetch(dbPath + type + '-list/')
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

export function requestDataInfo() {
  return { type: REQUEST_DATA_INFO }
}

export function receiveDataInfo(json) {
  return { 
    type: RECEIVE_DATA_INFO,
    data_info: json
  }
}

export function fetchDataInfo() {
  return function (dispatch) {

    dispatch(requestDataInfo())

    return fetch(dbPath + 'data-info/')
      .then(response => { return response.json()})
      .then(json => {
        dispatch(receiveDataInfo(json))
      })
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

export function fetchProfilePhoto(id, profileType) {
  console.log(id);

  return function (dispatch) {

    dispatch(requestProfilePhoto(id, profileType))
    const params = {
      query: id
    }
    return googlePlacesService.textSearch(params, (results, status) => {
      console.log(results);
      let photoUrl;
      if (results && results[0] && results[0].photos) {
        let photo = results[0].photos[0];
        if (photo.height > 500 && photo.width > 750) {
          photoUrl = photo.getUrl({'maxWidth': 1500, 'maxHeight': 1500});
        }
      } else {
        photoUrl = null;
      }
      dispatch(receiveProfilePhoto(id, profileType, photoUrl))
    });

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}

export function requestRanking(variable, profilePath) {
  return { 
    type: REQUEST_RANKING,
    variable,
    profilePath
  }
}

export function receiveRanking(variable, profilePath, rank) {
  return { 
    type: RECEIVE_RANKING,
    variable,
    profilePath,
    rank
  }
}

export function fetchRanking(collection, direction, variable, year, value, profilePath) {
  return function (dispatch) {
    dispatch(requestRanking(variable, profilePath))

    return fetch(dbPath + 'get-ranking/' + collection + "/" + direction + "/" + variable + "/" + year + "/" + value)
      .then(response => { return response.json()})
      .then(json => {
        dispatch(receiveRanking(variable, profilePath, json))
      })
  }
}

export function requestAllStatesData(collection) {
  return { type: REQUEST_ALL_STATES_DATA }
}

export function receiveAllStatesData(collection, json) {
  return { 
    type: RECEIVE_ALL_STATES_DATA,
    collection,
    data: json
  }
}

export function fetchAllStatesData(collection) {
  console.log("fetching " + collection);
  return function (dispatch) {

    dispatch(requestAllStatesData(collection))

    return fetch(dbPath + 'all-states-data/' + collection)
      .then(response => { return response.json()})
      .then(json => {
        console.log("this is the json response")
        console.log(json);
        dispatch(receiveAllStatesData(collection, json))
      })
  }
}

export function requestCongDistrictInfo(stateAbbrev) {
  return { 
    type: REQUEST_CONG_DISTRICT_INFO,
    stateAbbrev,
  }
}

export function receiveCongDistrictInfo(stateAbbrev, data) {
  return { 
    type: RECEIVE_CONG_DISTRICT_INFO,
    stateAbbrev,
    data
  }
}

export function fetchCongDistrictInfo(stateAbbrev) {
  return function (dispatch) {
    dispatch(requestCongDistrictInfo(stateAbbrev))

    return fetch(dbPath + 'state-congressional-district-info/' + stateAbbrev)
      .then(response => { return response.json()})
      .then(json => {
        dispatch(receiveCongDistrictInfo(stateAbbrev, json))
      })
  }
}

export function setDataFileUploadStatus(status) {
   return { 
      type: SET_DATA_FILE_UPLOAD_STATUS, 
      status: status
   }
}

export function uploadDataFile(collection, newFile) {
  console.log(newFile);

  return function (dispatch) {
    dispatch(setDataFileUploadStatus("Validating Data"))
    let processedData = validateData(newFile);

    dispatch(setDataFileUploadStatus("Nesting Years"))
    processedData = nestYears(processedData);

    dispatch(setDataFileUploadStatus("Setting Full State Names"))
    processedData = addFullStateNames(processedData);

    dispatch(setDataFileUploadStatus("Adding Path Keys"))
    processedData = addPathKeys(processedData);

    dispatch(setDataFileUploadStatus("Uploading Data to Database - " + processedData.length + " rows"))
    
    fetch(dbPath + 'update_data/' + collection, { 
        method: "POST", 
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify(processedData)
      })
      .then((res) => {
        dispatch(setDataFileUploadStatus(res.status))
      })
    
    return { 
        type: UPLOAD_DATA_FILE, 
    }
  }
}

export function setIndicatorUpdateStatus(status) {
   return { 
      type: SET_INDICATOR_UPDATE_STATUS, 
      status: status
   }
}

export function updateIndicator(newData, action) {
  console.log(newData);
  newData.action = action;

  return function (dispatch) {
    dispatch(setIndicatorUpdateStatus("in progress"))
    
    fetch(dbPath + 'update_indicator/', { 
        method: "POST", 
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify(newData)
      })
      .then((res) => {
        dispatch(setIndicatorUpdateStatus(res.status))
      })
  }
}

export function receiveMethodology(json) {
  return { 
      type: RECEIVE_METHODOLOGY, 
      data: json
    }
}

export function fetchMethodology() {
  return function (dispatch) {
    return fetch(dbPath + "methodology")
      .then(response => { return response.json()})
      .then(json => {
        console.log("this is the json response")
        console.log(json);

        dispatch(receiveMethodology(json))
      })
  }
}

export function setAdminLoginStatus(status) {
   return { 
      type: SET_ADMIN_LOGIN_STATUS, 
      status: status
   }
}

export function updateMethodology(newData) {
  console.log(newData);
  console.log(JSON.stringify(newData))

  return function (dispatch) {
    dispatch(setIndicatorUpdateStatus("in progress"))
    
    fetch(dbPath + 'update_methodology/', { 
        method: "POST", 
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify(newData)
      })
      .then((res) => {
        dispatch(setIndicatorUpdateStatus(res.status))
      })
  }
}


// export function sentUpdateIndicator(id, profileType) {
//    return { 
//     type: REQUEST_PROFILE_PHOTO, 
//     profileType, 
//     id 
//    }
// }
