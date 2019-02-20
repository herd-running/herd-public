import React, { Component } from 'react'
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { MapView, Location, Permissions } from 'expo'
const { Marker } = MapView

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsersRuns, getNewRuns } from '../actions/runs'

import moment from 'moment'

import HeaderComponent from '../components/Header'

import styles from '../styles/MapScreen'
import colors from '../constants/Colors'

class MapScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      region: {
        latitude: 47.6062,
        longitude: -122.3321,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }
  ///////replace 2 with user ID
  componentWillMount() {
    this.getLocationAsync();
    this.props.getUsersRuns(2)
    this.props.getNewRuns(2)
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.18,
        longitudeDelta: 0.1
      }
    })
  }

  updateSearch = search => {
    this.setState({ search })
  };

  onRegionChange = (region) => {
    this.setState({ region })
  }

  render() {
    return (
      <View>
        <HeaderComponent header='Map' />

        <View style={{ justifyContent: 'center' }}>
          <SearchBar
            lightTheme={true}
            placeholder="Search"
            onChangeText={(search) => { this.setState({ search }) }}
            value={this.state.search}
          />
        </View>

        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.region}
            onRegionChangeCompleted={this.onRegionChange}
          >
            {this.props.newRuns.map((run) => (
              <Marker
                key={run.id}
                coordinate={{
                  latitude: run.latitude,
                  longitude: run.longitude
                }}
                title={run.run_type}
                description={
                  run.day ?
                  `${run.day}s @ ${run.time}`
                  :
                  `${moment(run.date).format("dddd MMM Do")} @ ${run.time}`
                }
                pinColor='#6d3b84'
                onCalloutPress={() => this.props.navigation.navigate('ViewRun', { runId: run.id })}
              />
            ))}
            {this.props.usersRuns.map((run) => (
              <Marker
                key={run.run_id}
                coordinate={{
                  latitude: run.latitude,
                  longitude: run.longitude
                }}
                title={run.run_type}
                description={
                  run.day ?
                  `${run.day}s @ ${run.time}`
                  :
                  `${moment(run.date).format("dddd MMM Do")} @ ${run.time}`
                }
                pinColor={colors.otherColor}
                onCalloutPress={() => this.props.navigation.navigate('ViewRun', { runId: run.run_id })}
              />
            ))}
          </MapView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usersRuns: state.usersRuns,
    newRuns: state.newRuns
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUsersRuns,
    getNewRuns
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)