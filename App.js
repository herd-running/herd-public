import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import JoinScreen from './screens/JoinScreen'
import Dashboard from './screens/Dashboard'
import DiscoverScreen from './screens/DiscoverScreen'
import ViewRunScreen from './screens/ViewRunScreen'

import { createStackNavigator, createAppContainer } from 'react-navigation'

// export default class App extends Component {
//   render() {
//     return <HomeScreen />
//   }
// }

const AppNavigator = createStackNavigator({
  Join: JoinScreen,
  // LogIn: LogIn,
  // SignUp: SignUp,
  Dashboard: Dashboard,
  ViewRun: ViewRunScreen,
  Discover: DiscoverScreen
  // Profile: Profile,
}, 
{
  initialRouteName: 'ViewRun',
  headerMode: 'none'
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer





