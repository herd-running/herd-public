import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { usersGroups, newGroups, group } from './reducers/groups'
import { groupLeader, groupMembers, runMembers } from './reducers/users'
import { usersRuns, newRuns, groupRuns, run, newRunCoords } from './reducers/runs'

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
  newRunCoords 
})

const store = createStore(reducers, applyMiddleware(logger, thunk))

export default store