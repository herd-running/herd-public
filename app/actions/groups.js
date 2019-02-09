import axios from 'axios'
// import {attachHeader} from './utils'

const BASE_URL = process.env.REACT_APP_API_URL

export const GET_GROUPS = 'GET_GROUPS'

export function getGroups() {
  return dispatch => (
    axios.get(`${BASE_URL}/groups`)
      .then(response => {
        dispatch({      
          type: GET_GROUPS,
          payload: response.data
        })
      })
      .catch(() => console.warn('could not get groups'))

  )
}

export const GET_ONE_GROUP = 'GET_ONE_GROUP'

export function getOneGroup(groupId) {
  return dispatch => (
    axios.get(`${BASE_URL}/groups/${groupId}`)
      .then((response) => {
        dispatch({
          type: GET_ONE_GROUP,
          payload: response.data
        })
      })
  )
}