import { combineReducers } from 'redux'
import { CHANGE_CURR_ST, CHANGE_CURR_INST, REQUEST_ST, RECEIVE_ST, REQUEST_ST_LIST, RECEIVE_ST_LIST } from './actions'


function currSt(state = 'undefined', action) {
  switch (action.type) {
    case CHANGE_CURR_ST:
      return action.st
    default:
      return state
  }
}

function fetchedSts(state = {}, action) {
  console.log("curr state is ")
  console.log(state)
  console.log("curr action is ")
  console.log(action)
  switch (action.type) {
    case REQUEST_ST:
      return Object.assign({}, state, {
        [action.st] : {
          isFetching: true
        }
      })
    case RECEIVE_ST:
      return Object.assign({}, state, {
        [action.st] : {
          isFetching: false,
          data: action.stData
        }
      })
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
    case REQUEST_ST_LIST:
      return []
    case RECEIVE_ST_LIST:
      return action.stList
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currSt,
  fetchedSts,
  stList,
})

export default rootReducer