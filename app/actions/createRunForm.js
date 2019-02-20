export const SET_FORM_VALUE = 'SET_FORM_VALUE'

export function setFormValue(field, value) {
  return {
    type: SET_FORM_VALUE,
    field,
    value
  }
}

export const CLEAR_FORM = 'CLEAR_FORM'

export function clearForm() {
  return {
    type: CLEAR_FORM
  }
}