export const SET_AUTHENTICATION = 'SET_AUTHENTICATION'

export function setAuthentication(id, cb) {
  return dispatch => {

    dispatch({
      type: SET_AUTHENTICATION,
      payload: id
    })
    
    if (cb) cb()
  }
}