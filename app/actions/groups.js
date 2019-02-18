import axios from 'axios'
// import {attachHeader} from './utils'

const BASE_URL = 'http://localhost:3000'

export const GET_USERS_GROUPS = 'GET_GROUPS'

export function getUsersGroups(userId) {
  return dispatch => (
    axios.get(`${BASE_URL}/users/${userId}/groups?member=true`)
      .then(response => {
        dispatch({
          type: GET_USERS_GROUPS,
          payload: response.data
        })
      })
      .catch((error) => console.warn(error.response))
  )
}

export const GET_NEW_GROUPS = 'GET_NEW_GROUPS'

export function getNewGroups(userId) {
  return dispatch => (
    axios.get(`${BASE_URL}/users/${userId}/groups?member=false`)
      .then(response => {
        dispatch({
          type: GET_NEW_GROUPS,
          payload: response.data
        })
      })
      .catch((error) => console.warn(error.response))
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
      .catch((error) => console.warn(error.response))
  )
}

export function joinGroup(groupId, userId) {
  return (dispatch) => {
    axios.post(`${BASE_URL}/groups/${groupId}/users/${userId}`)
      .then(() => {
        dispatch(getUsersGroups(userId))
      })
      .then(() => {
        dispatch(getNewGroups(userId))
      })
      .catch((error) => console.warn(error.response))
  }
}

export function leaveGroup(groupId, userId) {
  return (dispatch) => {
    axios.delete(`${BASE_URL}/groups/${groupId}/users/${userId}`)
      .then(() => {
        dispatch(getUsersGroups(userId))
      })
      .then(() => {
        dispatch(getNewGroups(userId))
      })
      .catch((error) => console.warn(error.response))
  }
}

export function createGroup(userId, newGroup) {
  return (dispatch) => {
    axios.post(`${BASE_URL}/users/${userId}/groups`, newGroup)
      .then(() => {
        dispatch(getUsersGroups(userId))
      })
      .catch((error) => console.warn(error.response))
  }
}

export function deleteGroup(groupId, userId) {
  return (dispatch) => {
    axios.delete(`${BASE_URL}/groups/${groupId}`)
      .then(() => {
        dispatch(getUsersGroups(userId))
      })
      .catch((error) => console.warn(error.response))
  }
}