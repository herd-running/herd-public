import axios from 'axios'
// import {attachHeader} from './utils'

const BASE_URL = 'http://localhost:3000'

export const GET_GROUP_LEADER = 'GET_GROUP_LEADER'

export function getGroupLeader(groupId) {
  return dispatch => (
    axios.get(`${BASE_URL}/groups/${groupId}/users?leader=true`)
      .then(response => {
        dispatch({      
          type: GET_GROUP_LEADER,
          payload: response.data
        })
      })
      .catch((error) => console.warn(error.response))
  )
}

export const GET_GROUP_MEMBERS = 'GET_GROUP_MEMBERS'

export function getGroupMembers(groupId) {
  return dispatch => (
    axios.get(`${BASE_URL}/groups/${groupId}/users`)
      .then(response => {
        dispatch({      
          type: GET_GROUP_MEMBERS,
          payload: response.data
        })
      })
      .catch((error) => console.warn(error.response))
  )
}

export const GET_RUN_MEMBERS = 'GET_RUN_MEMBERS'

export function getRunMembers(runId) {
  return dispatch => (
    axios.get(`${BASE_URL}/runs/${runId}/users`)
      .then(response => {
        dispatch({      
          type: GET_RUN_MEMBERS,
          payload: response.data
        })
      })
      .catch((error) => console.warn(error.response))
  )
}

