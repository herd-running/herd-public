import axios from 'axios'
// import {attachHeader} from './utils'
import { BASE_URL } from '../../hidden'
import { getOneRun } from './runs'

export const GET_RUN_COMMENTS = 'GET_RUN_COMMENTS'

export function getRunComments(runId) {
  return dispatch => (
    axios.get(`${BASE_URL}/runs/${runId}/comments`)
      .then(response => {
        dispatch({
          type: GET_RUN_COMMENTS,
          payload: response.data
        })
      })
      .catch((error) => console.warn(error.response))
  )
}

export function postRunComment(runId, newComment) {
  return (dispatch) => {
    axios.post(`${BASE_URL}/runs/${runId}/comments`, newComment)
      .then(() => {
        dispatch(getOneRun(runId))
        dispatch(getRunComments(runId))
      })
      .catch((error) => console.warn(error.response))
  }
}

export function deleteRunComment(runId, commentId) {
  return (dispatch) => {
    axios.delete(`${BASE_URL}/runs/${runId}/comments/${commentId}`)
      .then(() => {
        dispatch(getOneRun(runId))
        dispatch(getRunComments(runId))
      })
      .catch((error) => console.warn(error.response))
  }
}

export const GET_GROUP_COMMENTS = 'GET_GROUP_COMMENTS'

export function getGroupComments(groupId) {
  return dispatch => (
    axios.get(`${BASE_URL}/groups/${groupId}/comments`)
      .then(response => {
        dispatch({
          type: GET_GROUP_COMMENTS,
          payload: response.data
        })
      })
      .catch((error) => console.warn(error.response))
  )
}

export function postGroupComment(groupId, newComment) {
  return (dispatch) => {
    axios.post(`${BASE_URL}/groups/${groupId}/comments`, newComment)
      .then(() => {
        dispatch(getGroupComments(groupId))
      })
      .catch((error) => console.warn(error.response))
  }
}

export function deleteGroupComment(groupId, commentId) {
  return (dispatch) => {
    axios.delete(`${BASE_URL}/groups/${groupId}/comments/${commentId}`)
      .then(() => {
        dispatch(getGroupComments(groupId))
      })
      .catch((error) => console.warn(error.response))
  }
}