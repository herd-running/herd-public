import { GET_RUN_COMMENTS, GET_GROUP_COMMENTS } from '../actions/comments'

export function comments(state = [], action) {
  switch (action.type) {

    case GET_RUN_COMMENTS:
      return action.payload

    case GET_GROUP_COMMENTS:
      return action.payload

    default: return state
  }
}