import { SET_FORM_VALUE, CLEAR_FORM } from '../actions/createRunForm'
import moment from 'moment'

const date = new Date
const today = moment(date).format('MM-DD-YYYY')

const defaultState = {
  day: '',
  date: today,
  time: '',
  location: '',
  latitude: 0,
  longitude: 0,
  run_type: '   ',
  terrain: '   ',
  pace: '   ',
  distance: '',
  description: ''
}

export function formValues(state = defaultState, action) {
  switch (action.type) {

    case SET_FORM_VALUE:
      return { ...state, [action.field]: action.value }

    case CLEAR_FORM:
      return defaultState

    default: return state
  }
}