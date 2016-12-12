import fetch from 'isomorphic-fetch'

/*
 * action types
 */

export const CHANGE_CURR_ST = 'CHANGE_CURR_ST'
export const CHANGE_CURR_INST = 'CHANGE_CURR_INST'

export const REQUEST_ST = 'REQUEST_ST'
export const RECEIVE_ST = 'RECEIVE_ST'

/*
 * action creators
 */

export function changeCurrSt(st) {
  return { type: CHANGE_CURR_ST, st }
}

export function changeCurrInst(inst) {
  return { type: CHANGE_CURR_INST, inst }
}

export function requestSt(st) {
  return { type: REQUEST_ST, st }
}

export function receiveSt(st, json) {
	return { 
	  	type: RECEIVE_ST, 
	  	st,
	  	stData: json
   	}
}


// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchSt(st) {
	console.log(st);
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(changeCurrSt(st))
    dispatch(requestSt(st))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch('http://localhost:3000/api/states/' + st)
      .then(response => { return response.json()})
      .then(json => {
      	console.log("this is the json response")
      	console.log(json);
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveSt(st, json))
      })

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}