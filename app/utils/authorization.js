import axios from 'axios'

import { SecureStore } from 'expo'

import { BASE_URL } from '../../hidden'

export const postLogin = (body) => {
  return axios.post(`${BASE_URL}/login`, body)
}

export const getUserId = () => {
  return SecureStore.getItemAsync('token')
    .then((token) => {
      return axios.get(`${BASE_URL}/login`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
    })
}