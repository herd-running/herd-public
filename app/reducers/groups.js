import { GET_USERS_GROUPS, GET_NEW_GROUPS, GET_ONE_GROUP } from '../actions/groups'

export function usersGroups(state = [], action) {
  switch (action.type) {

    case GET_USERS_GROUPS:
      return action.payload

    default: return state
  }
}

export function newGroups(state = [], action) {
  switch (action.type) {

    case GET_NEW_GROUPS:
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