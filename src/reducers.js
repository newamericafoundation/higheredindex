import { combineReducers } from 'redux'
import { TOGGLE_MENU_EXPANSION, TOGGLE_TOP_NAV_PROFILE_NAME, CHANGE_CURR_PROFILE, REQUEST_PROFILE, RECEIVE_PROFILE, REQUEST_PROFILE_LIST, RECEIVE_PROFILE_LIST, REQUEST_PROFILE_PHOTO, RECEIVE_PROFILE_PHOTO, SET_INDICATOR_UPDATE_STATUS} from './actions'

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

function fetchedIndicators(state = {}, action) {
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

function indicatorUpdateStatus(state = "inactive", action) {
  switch (action.type) {
    case SET_INDICATOR_UPDATE_STATUS:
      return action.status
    default:
      return state
  }
}

const rootReducer = combineReducers({
  menuExpanded,
  currProfile,
  topNavProfileNameShown,
  fetchedSts,
  fetchedInsts,
  fetchedIndicators,
  fetchedStPhotos,
  fetchedInstPhotos,
  stList,
  instList,
  indicatorList,
  indicatorUpdateStatus
})

export default rootReducer