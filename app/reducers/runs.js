import { GET_NEW_RUNS, GET_USERS_RUNS, GET_GROUPS_RUNS, GET_ONE_RUN } from '../actions/runs'

export function newRuns(state = [], action) {
  switch (action.type) {

  case GET_NEW_RUNS:
    return action.payload

  default: return state
  }
}

export function usersRuns(state = [], action) {
  switch (action.type) {

  case GET_USERS_RUNS:
    return action.payload

  default: return state
  }
}

export function groupRuns(state = [], action) {
  switch (action.type) {

  case GET_GROUPS_RUNS:
    return action.payload

  default: return state
  }
}

export function run(state = {}, action) {
  switch (action.type) {

  case GET_ONE_RUN:
    return action.payload

  default: return state
  }
}