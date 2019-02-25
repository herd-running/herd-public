import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { usersGroups, newGroups, group } from './reducers/groups'
import { groupLeader, groupMembers, runMembers } from './reducers/users'
import { usersRuns, newRuns, groupRuns, run } from './reducers/runs'
import { comments } from './reducers/comments'
import { formValues } from './reducers/createRunForm'
import { authentication } from './reducers/authentication'

const reducers = combineReducers({ 
  usersGroups, 
  newGroups, 
  group, 
  groupLeader, 
  groupMembers, 
  runMembers, 
  usersRuns, 
  newRuns, 
  groupRuns, 
  run,
  comments,
  formValues,
  authentication
})

const store = createStore(reducers, applyMiddleware(thunk, logger))

export default store