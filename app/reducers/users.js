import { GET_GROUP_LEADER, GET_GROUP_MEMBERS, GET_RUN_MEMBERS } from '../actions/users'

export function groupLeader(state = {}, action) {
  switch (action.type) {

  case GET_GROUP_LEADER:
    return action.payload

  default: return state
  }
}

export function groupMembers(state = [], action) {
  switch (action.type) {

  case GET_GROUP_MEMBERS:
    return action.payload

  default: return state
  }
}

export function runMembers(state = [], action) {
  switch (action.type) {

  case GET_RUN_MEMBERS:
    return action.payload

  default: return state
  }
}