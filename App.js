import React from 'react'

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import JoinScreen from './screens/JoinScreen'
import DashboardRuns from './screens/DashboardRuns'
import DashboardGroups from './screens/DashboardGroups'
import DiscoverScreen from './screens/DiscoverScreen'
import ViewRunScreen from './screens/ViewRunScreen'
import ViewGroupScreen from './screens/ViewGroupScreen'
import CreateChoicesScreen from './screens/CreateChoicesScreen'
import CreateRunScreen from './screens/CreateRunScreen'
import CreateGroupScreen from './screens/CreateGroupScreen'
import MapScreen from './screens/MapScreen'

import colors from './constants/Colors'

const DashboardRunStack = createStackNavigator({
  Join: JoinScreen,
  // LogIn: LogIn,
  // SignUp: SignUp,
  DashboardRuns: DashboardRuns,
  ViewRun: ViewRunScreen,
},
  {
    initialRouteName: 'Join',
    headerMode: 'none'
  }
)

DashboardRunStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index === 0) {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}

const DashboardGroupStack = createStackNavigator({
  DashboardGroups: DashboardGroups,
  ViewGroup: ViewGroupScreen
},
  {
    initialRouteName: 'DashboardGroups',
    headerMode: 'none'
  }
)

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
  ViewRun: ViewRunScreen,
  ViewGroup: ViewGroupScreen
},
  {
    initialRouteName: 'Discover',
    headerMode: 'none'
  })

const MapStack = createStackNavigator({
  Map: MapScreen, 
  ViewRun: ViewRunScreen,
  ViewGroup: ViewGroupScreen
},
  {
    initialRouteName: 'Map',
    headerMode: 'none'
  })

const TabNavigator = createBottomTabNavigator({
  'Runs': DashboardRunStack,
  'Groups': DashboardGroupStack,
  'Create': CreateNewStack,
  'Discover': DiscoverStack,
  'Map': MapStack
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
        } else if (routeName === 'Create') {
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





