import React from 'react'

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import JoinScreen from './screens/JoinScreen'
import Dashboard from './screens/Dashboard'
import DiscoverScreen from './screens/DiscoverScreen'
import ViewRunScreen from './screens/ViewRunScreen'
import ViewGroupScreen from './screens/ViewGroupScreen'
import CreateChoicesScreen from './screens/CreateChoicesScreen'
import CreateRunScreen from './screens/CreateRunScreen'
import CreateGroupScreen from './screens/CreateGroupScreen'

import colors from './constants/Colors'

const DashboardStack = createStackNavigator({
  Join: JoinScreen,
  // LogIn: LogIn,
  // SignUp: SignUp,
  Dashboard: Dashboard,
  ViewRun: ViewRunScreen,
  ViewGroup: ViewGroupScreen
},
  {
    initialRouteName: 'Join',
    headerMode: 'none'
  })

DashboardStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index === 0) {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}

const CreateNewStack = createStackNavigator({
  Choose: CreateChoicesScreen,
  CreateRun: CreateRunScreen,
  CreateGroup: CreateGroupScreen
},
  {
    initialRouteName: 'Choose',
    headerMode: 'none'
  })

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScreen,
  // Map: MapScreen, 
  ViewRun: ViewRunScreen,
  ViewGroup: ViewGroupScreen
},
  {
    initialRouteName: 'Discover',
    headerMode: 'none'
  })

const TabNavigator = createBottomTabNavigator({
  Runs: DashboardStack,
  Groups: Dashboard,
  Add: CreateNewStack,
  Discover: DiscoverStack,
  Map: DiscoverStack
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName
        let size
        let style
        if (routeName === 'Runs') {
          iconName = 'run'
          size = 33
        } else if (routeName === 'Groups') {
          iconName = 'account-multiple'
          size = 47
          style = { paddingBottom: 5 }
        } else if (routeName === 'Add') {
          iconName = 'plus-circle'
          size = 35
        } else if (routeName === 'Discover') {
          iconName = 'magnify'
          size = 35
        } else if (routeName === 'Map') {
          iconName = 'map'
          size = 35
        }
        return (<Icon
          name={iconName}
          type='material-community'
          size={size}
          color={colors.otherColor}
          iconStyle={style}
        />
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.otherColor,
      inactiveTintColor: colors.otherColor,
      labelStyle: { fontSize: 14 },
      style: { height: 55, backgroundColor: colors.backgroundColor, paddingTop: 5 }
    }
  })

export default createAppContainer(TabNavigator)





