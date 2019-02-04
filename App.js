import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import JoinScreen from './screens/JoinScreen'
import HomeScreen from './screens/Dashboard'

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
  Home: HomeScreen
  // Dash: DashBoard,
  // Profile: Profile,
}, 
{
  // initialRouteName: 'Join',
  initialRouteName: 'Home',
  headerMode: 'none'
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer





