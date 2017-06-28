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
export const UPDATE_INDICATOR = 'UPDATE_INDICATOR'
export const SET_INDICATOR_UPDATE_STATUS = 'SET_INDICATOR_UPDATE_STATUS'
export const UPLOAD_DATA_FILE = 'UPLOAD_DATA_FILE'
export const SET_DATA_FILE_UPLOAD_STATUS = 'SET_DATA_FILE_UPLOAD_STATUS'

// export const REQUEST_INST = 'REQUEST_INST'
// export const RECEIVE_INST = 'RECEIVE_INST'
// export const REQUEST_INST_LIST = 'REQUEST_INST_LIST'
// export const RECEIVE_INST_LIST = 'RECEIVE_INST_LIST'
let GoogleMapsLoader = require('google-maps');
let json2csv = require('json2csv');
let JSZip = require("jszip");

let googlePlacesService; 
GoogleMapsLoader.LIBRARIES = ['places'];
GoogleMapsLoader.KEY = 'AIzaSyBwiCv57aVHoDiIaY-zTFfQTWLq4ForFuM';
GoogleMapsLoader.load(function(google) {
  googlePlacesService = new google.maps.places.PlacesService(document.createElement('div'));
});

const dbPath = process.env.NODE_ENV == 'production' ? 'https://febp-backend.herokuapp.com/api/' : 'http://localhost:3000/api/';
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

function convertToCSV(data, resolve, reject) {
  json2csv({ data:data, flatten:true}, function(err, csv) {
    if (err) return reject;
    csv = 'data:text/csv;charset=utf-8,' + csv;

    let data = encodeURI(csv);
    return resolve(csv);
  });
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
    dispatch(setDataFileUploadStatus("in progress"))

    console.log(JSON.stringify(newFile));
    
    fetch(dbPath + 'update_data/' + collection, { 
        method: "POST", 
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify(newFile)
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
    
    return { 
        type: UPDATE_INDICATOR, 
    }
  }
}

// export function sentUpdateIndicator(id, profileType) {
//    return { 
//     type: REQUEST_PROFILE_PHOTO, 
//     profileType, 
//     id 
//    }
// }
