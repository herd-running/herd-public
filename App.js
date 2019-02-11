import React, { Component } from 'react'

import store from './app/store'
import { Provider } from 'react-redux'

import AppNavigator from './app/components/Navigation'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}





