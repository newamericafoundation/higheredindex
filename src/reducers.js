import { combineReducers } from 'redux'
import { TOGGLE_MENU_EXPANSION, TOGGLE_TOP_NAV_PROFILE_NAME, CHANGE_CURR_PROFILE, CHANGE_CURR_PROFILE_SECTION, REQUEST_PROFILE, RECEIVE_PROFILE, REQUEST_PROFILE_LIST, RECEIVE_PROFILE_LIST, REQUEST_PROFILE_PHOTO, RECEIVE_PROFILE_PHOTO, SET_INDICATOR_UPDATE_STATUS, SET_DATA_FILE_UPLOAD_STATUS, SET_ADMIN_LOGIN_STATUS, REQUEST_DATA_INFO, RECEIVE_DATA_INFO, REQUEST_RANKING, RECEIVE_RANKING, REQUEST_CONG_DISTRICT_INFO, RECEIVE_CONG_DISTRICT_INFO, REQUEST_ALL_STATES_DATA, RECEIVE_ALL_STATES_DATA, REQUEST_US_DATA, RECEIVE_US_DATA, RECEIVE_METHODOLOGY} from './actions'

function menuExpanded(state = false, action) {
  switch (action.type) {
    case TOGGLE_MENU_EXPANSION:
      return action.setExpansionState != null ? action.setExpansionState : !state
    default:
      return state
  }
}

function currProfile(state = {}, action) {
  switch (action.type) {
    case CHANGE_CURR_PROFILE:
      return {
        id: action.id,
        name: action.name,
        type: action.profileType
      }
    default:
      return state
  }
}

function currProfileSection(state = 'none', action) {
  switch (action.type) {
    case CHANGE_CURR_PROFILE_SECTION:
      return action.sectionIndex
    default:
      return state
  }
}

function topNavProfileNameShown(state = false, action) {
  switch (action.type) {
    case TOGGLE_TOP_NAV_PROFILE_NAME:
      return action.newSetting
    default:
      return state
  }
}

function fetchedSts(state = {}, action) {
  switch (action.type) {
    case REQUEST_PROFILE:
      if (action.profileType == "state") {
        return Object.assign({}, state, {
          [action.id] : {
            isFetching: true
          }
        })
      } else {
        return state
      }
    case RECEIVE_PROFILE:
      if (action.profileType == "state") {
        return Object.assign({}, state, {
          [action.id] : {
            isFetching: false,
            data: action.data
          }
        })
      } else {
        return state
      }
    default:
      return state
  }
}

function fetchedInsts(state = {}, action) {
  switch (action.type) {
    case REQUEST_PROFILE:
      if (action.profileType == "institution") {
        return Object.assign({}, state, {
          [action.id] : {
            isFetching: true
          }
        })
      } else {
        return state
      }
    case RECEIVE_PROFILE:
      if (action.profileType == "institution") {
        return Object.assign({}, state, {
          [action.id] : {
            isFetching: false,
            data: action.data
          }
        })
      } else {
        return state
      }
    default:
      return state
  }
}

function fetchedIndicatorSettings(state = {}, action) {
  switch (action.type) {
    case REQUEST_PROFILE:
      if (action.profileType == "indicator") {
        return Object.assign({}, state, {
          [action.id] : {
            isFetching: true
          }
        })
      } else {
        return state
      }
    case RECEIVE_PROFILE:
      if (action.profileType == "indicator") {
        return Object.assign({}, state, {
          [action.id] : {
            isFetching: false,
            data: action.data
          }
        })
      } else {
        return state
      }
    default:
      return state
  }
}

function fetchedStPhotos(state = {}, action) {
  switch (action.type) {
    case REQUEST_PROFILE_PHOTO:
      if (action.profileType == "state") {
        return Object.assign({}, state, {
          [action.id] : {
            isFetching: true
          }
        })
      } else {
        return state
      }
    case RECEIVE_PROFILE_PHOTO:
      if (action.profileType == "state") {
        return Object.assign({}, state, {
          [action.id] : {
            isFetching: false,
            photoUrl: action.photoUrl,
            attribution: action.attribution
          }
        })
      } else {
        return state
      }
    default:
      return state
  }
}

function fetchedInstPhotos(state = {}, action) {
  switch (action.type) {
    case REQUEST_PROFILE_PHOTO:
      if (action.profileType == "institution") {
        return Object.assign({}, state, {
          [action.id] : {
            isFetching: true
          }
        })
      } else {
        return state
      }
    case RECEIVE_PROFILE_PHOTO:
      if (action.profileType == "institution") {
        return Object.assign({}, state, {
          [action.id] : {
            isFetching: false,
            photoUrl: action.photoUrl
          }
        })
      } else {
        return state
      }
    default:
      return state
  }
}

function stList(state = [], action) {
  switch (action.type) {
    case REQUEST_PROFILE_LIST:
      return []
    case RECEIVE_PROFILE_LIST:
      return action.listType == "state" ? action.list : state
    default:
      return state
  }
}

function instList(state = [], action) {
  switch (action.type) {
    case REQUEST_PROFILE_LIST:
      return []
    case RECEIVE_PROFILE_LIST:
      return action.listType == "institution" ? action.list : state
    default:
      return state
  }
}

function dataInfo(state = null, action) {
  switch (action.type) {
    case REQUEST_DATA_INFO:
      return "fetching"
    case RECEIVE_DATA_INFO:
      return action.data_info
    default:
      return state
  }
}

function fetchedAllStatesData(state = {}, action) {
  switch (action.type) {
    case REQUEST_ALL_STATES_DATA:
      return Object.assign({}, state, {
        [action.collection] : "fetching"
      })
    case RECEIVE_ALL_STATES_DATA:
      return Object.assign({}, state, {
        [action.collection] : action.data
      })
    default:
      return state
  }
}

function fetchedUsData(state = {}, action) {
  switch (action.type) {
    case REQUEST_US_DATA:
      return Object.assign({}, state, {
        [action.collection] : "fetching"
      })
    case RECEIVE_US_DATA:
      return Object.assign({}, state, {
        [action.collection] : action.data
      })
    default:
      return state
  }
}

function fetchedRankings(state = {}, action) {
  switch (action.type) {
    case REQUEST_RANKING:
      return Object.assign({}, state, {
        [action.profilePath + "_" + action.variable] : "fetching"
      })
    case RECEIVE_RANKING:
      return Object.assign({}, state, {
        [action.profilePath + "_" + action.variable] : action.rank
      })
    default:
      return state
  }
}

function fetchedCongDistrictInfo(state = {}, action) {
  switch (action.type) {
    case REQUEST_CONG_DISTRICT_INFO:
      return Object.assign({}, state, {
        [action.stateAbbrev] : "fetching"
      })
    case RECEIVE_CONG_DISTRICT_INFO:
      return Object.assign({}, state, {
        [action.stateAbbrev] : action.data
      })
    default:
      return state
  }
}

function indicatorList(state = [], action) {
  switch (action.type) {
    case REQUEST_PROFILE_LIST:
      return []
    case RECEIVE_PROFILE_LIST:
      return action.listType == "indicator" ? action.list : state
    default:
      return state
  }
}

function dataFileUploadStatus(state = "inactive", action) {
  switch (action.type) {
    case SET_DATA_FILE_UPLOAD_STATUS:
      return action.status
    default:
      return state
  }
}

function indicatorUpdateStatus(state = "inactive", action) {
  switch (action.type) {
    case SET_INDICATOR_UPDATE_STATUS:
      return action.status
    default:
      return state
  }
}

function adminLoginStatus(state = false, action) {
  switch (action.type) {
    case SET_ADMIN_LOGIN_STATUS:
      return action.status
    default:
      return state
  }
}

function fetchedMethodology(state = "", action) {
  switch (action.type) {
    case RECEIVE_METHODOLOGY:
      return action.data
    default:
      return state
  }
}

const rootReducer = combineReducers({
  menuExpanded,
  currProfile,
  currProfileSection,
  topNavProfileNameShown,
  fetchedSts,
  fetchedInsts,
  fetchedIndicatorSettings,
  fetchedStPhotos,
  fetchedInstPhotos,
  fetchedRankings,
  fetchedCongDistrictInfo,
  fetchedAllStatesData,
  fetchedUsData,
  fetchedMethodology,
  stList,
  instList,
  dataInfo,
  indicatorList,
  dataFileUploadStatus,
  indicatorUpdateStatus,
  adminLoginStatus
})

export default rootReducer