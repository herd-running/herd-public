import { GET_GROUPS, GET_ONE_GROUP } from '../actions/groups'

export function groups(state = [], action) {
  switch (action.type) {

  case GET_GROUPS:
    return action.payload

  default: return state
  }
}

export function group(state = {}, action) {
  switch (action.type) {

  case GET_ONE_GROUP:
    return action.payload

  default: return state
  }
}