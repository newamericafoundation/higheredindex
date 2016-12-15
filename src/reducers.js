import { combineReducers } from 'redux'
import { CHANGE_CURR_PROFILE, REQUEST_PROFILE, RECEIVE_PROFILE, REQUEST_PROFILE_LIST, RECEIVE_PROFILE_LIST} from './actions'


function currProfile(state = {}, action) {
  switch (action.type) {
    case CHANGE_CURR_PROFILE:
      return {
        name: action.name,
        type: action.profileType
      }
    default:
      return state
  }
}

function fetchedSts(state = {}, action) {
  switch (action.type) {
    case REQUEST_PROFILE:
      if (action.profileType == "state") {
        return Object.assign({}, state, {
          [action.name] : {
            isFetching: true
          }
        })
      } else {
        return state
      }
    case RECEIVE_PROFILE:
      if (action.profileType == "state") {
        return Object.assign({}, state, {
          [action.name] : {
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
          [action.name] : {
            isFetching: true
          }
        })
      } else {
        return state
      }
    case RECEIVE_PROFILE:
      if (action.profileType == "institution") {
        return Object.assign({}, state, {
          [action.name] : {
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

function stList(state = [], action) {
  console.log("curr state is ")
  console.log(state)
  console.log("curr action is ")
  console.log(action)
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
  console.log("curr state is ")
  console.log(state)
  console.log("curr action is ")
  console.log(action)
  switch (action.type) {
    case REQUEST_PROFILE_LIST:
      return []
    case RECEIVE_PROFILE_LIST:
      return action.listType == "institution" ? action.list : state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currProfile,
  fetchedSts,
  fetchedInsts,
  stList,
  instList
})

export default rootReducer