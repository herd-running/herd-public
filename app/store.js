import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { groups, group } from './reducers/groups'

const reducers = combineReducers({ groups, group })

const store = createStore(reducers, applyMiddleware(logger, thunk))

export default store