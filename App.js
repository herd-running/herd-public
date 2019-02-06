import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import JoinScreen from './screens/JoinScreen'
import Dashboard from './screens/Dashboard'
import DiscoverScreen from './screens/DiscoverScreen'
import ViewRunScreen from './screens/ViewRunScreen'
import ViewGroupScreen from './screens/ViewGroupScreen'
import CreateRunScreen from './screens/CreateRunScreen'
import CreateGroupScreen from './screens/CreateGroupScreen'

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
  // Profile: Profile,
  Dashboard: Dashboard,
  ViewRun: ViewRunScreen,
  ViewGroup: ViewGroupScreen,
  Discover: DiscoverScreen,
  // Map: MapScreen, 
  CreateRun: CreateRunScreen,
  CreateGroup: CreateGroupScreen
}, 
{
  initialRouteName: 'CreateGroup',
  headerMode: 'none'
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer





