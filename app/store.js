import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { usersGroups, newGroups, group } from './reducers/groups'
import { groupLeader, groupMembers, runMembers } from './reducers/users'
import { usersRuns, newRuns, groupRuns, run } from './reducers/runs'
import { formValues } from './reducers/createRunForm'

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
  formValues
})

const store = createStore(reducers, applyMiddleware(thunk, logger))

export default store