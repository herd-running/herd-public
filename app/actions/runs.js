import axios from 'axios'
// import {attachHeader} from './utils'

const BASE_URL = 'http://localhost:3000'

export const GET_USERS_RUNS = 'GET_USERS_RUNS'

export function getUsersRuns(userId) {
  return dispatch => (
    axios.get(`${BASE_URL}/users/${userId}/runs?running=true`)
    .then(response => {
      dispatch({      
        type: GET_USERS_RUNS,
        payload: response.data
      })
    })
    .catch((error) => console.warn(error.response))
    )
  }
  
  export const GET_NEW_RUNS = 'GET_NEW_RUNS'
  
  export function getNewRuns(userId) {
    return dispatch => (
      axios.get(`${BASE_URL}/users/${userId}/runs?running=false`)
        .then(response => {
          dispatch({      
            type: GET_NEW_RUNS,
            payload: response.data
          })
        })
        .catch((error) => console.warn(error.response))
    )
  }

export const GET_GROUPS_RUNS = 'GET_GROUPS_RUNS'

export function getGroupRuns(groupId) {
  return dispatch => (
    axios.get(`${BASE_URL}/groups/${groupId}/runs`)
      .then(response => {
        dispatch({      
          type: GET_GROUPS_RUNS,
          payload: response.data
        })
      })
      .catch((error) => console.warn(error.response))
  )
}

export const GET_ONE_RUN = 'GET_ONE_RUN'

export function getOneRun(runId) {
  return dispatch => (
    axios.get(`${BASE_URL}/runs/${runId}`)
      .then((response) => {
        dispatch({
          type: GET_ONE_RUN,
          payload: response.data
        })
      })
      .catch((error) => console.warn(error.response))
  )
}