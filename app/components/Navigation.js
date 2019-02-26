import React, { Component } from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

// import LandingScreen from '../screens/LandingScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import DashboardRuns from '../screens/DashboardRuns'
import DashboardGroups from '../screens/DashboardGroups'
import DiscoverScreen from '../screens/DiscoverScreen'
import ViewRunScreen from '../screens/ViewRunScreen'
import ViewRunMapScreen from '../screens/ViewRunMapScreen'
import ViewGroupScreen from '../screens/ViewGroupScreen'
import CreateRunScreen from '../screens/CreateRunScreen'
import AddressSearchMapScreen from '../screens/AddressSearchMapScreen'
import CreateGroupScreen from '../screens/CreateGroupScreen'
import MapScreen from '../screens/MapScreen'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearForm } from '../actions/createRunForm'

import colors from '../utils/Colors'

const DashboardRunStack = createStackNavigator({
  DashboardRuns: DashboardRuns,
  ViewRun: ViewRunScreen,
  ViewRunMap: ViewRunMapScreen
},
  {
    initialRouteName: 'DashboardRuns',
    headerMode: 'none'
  }
)

const DashboardGroupStack = createStackNavigator({
  DashboardGroups: DashboardGroups,
  ViewGroup: ViewGroupScreen,
  CreateGroup: CreateGroupScreen,
  CreateGroupRun: CreateRunScreen,
  AddressSearch: AddressSearchMapScreen,
  ViewRun: ViewRunScreen,
  ViewRunMap: ViewRunMapScreen
},
  {
    initialRouteName: 'DashboardGroups',
    headerMode: 'none'
  }
)

const CreateNewStack = createStackNavigator({
  CreateRun: CreateRunScreen,
  AddressSearch: AddressSearchMapScreen
},
  {
    initialRouteName: 'CreateRun',
    headerMode: 'none'
  })

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScreen,
  ViewRun: ViewRunScreen,
  ViewRunMap: ViewRunMapScreen,
  ViewGroup: ViewGroupScreen
},
  {
    initialRouteName: 'Discover',
    headerMode: 'none'
  })

const MapStack = createStackNavigator({
  Map: MapScreen,
  ViewRun: ViewRunScreen,
  ViewGroup: ViewGroupScreen,
  ViewRunMap: ViewRunMapScreen
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
          size = 33
        } else if (routeName === 'Discover') {
          iconName = 'magnify'
          size = 35
        } else if (routeName === 'Map') {
          iconName = 'map'
          size = 35
        }
        return (
          <Icon
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

const AuthenticationStack = createStackNavigator({
  // Landing: LandingScreen,
  Login: LoginScreen,
  Signup: SignupScreen,
  Authenticated: TabNavigator
},
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

const AppNavigator = createAppContainer(AuthenticationStack)

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

class App extends Component {
  render() {
    return <AppNavigator
      onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getActiveRouteName(currentState)
        const prevScreen = getActiveRouteName(prevState)

        if (prevScreen === 'CreateRun' && (currentScreen !== 'AddressSearch' && currentScreen !== 'CreateRun')) {
          this.props.clearForm()
        }

        if (prevScreen === 'CreateGroupRun' && (currentScreen !== 'AddressSearch' && currentScreen !== 'CreateGroupRun')) {
          this.props.clearForm()
        }
      }}
    />
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    clearForm
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(App)
