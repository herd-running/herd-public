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
import colors from '../utils/Colors'

class MapScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      region: {
        latitude: 47.6062,
        longitude: -122.3321,
        latitudeDelta: 0.24,
        longitudeDelta: 0.13
      }
    }
  }

  componentWillMount() {
    const userId = this.props.authentication.user
    this.getLocationAsync();
    this.props.getUsersRuns(userId)
    this.props.getNewRuns(userId)
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
        latitudeDelta: 0.24,
        longitudeDelta: 0.13
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
    const filteredNewRuns = this.props.newRuns.filter(run => {
      return run.run_type.toLowerCase().includes(this.state.search) || 
        run.location.toLowerCase().includes(this.state.search) || 
        run.day && run.day.toLowerCase().includes(this.state.search) ||
        run.terrain.toLowerCase().includes(this.state.search) ||
        run.creator.toLowerCase().includes(this.state.search) ||
        run.description && run.description.toLowerCase().includes(this.state.search)
    })

    const filteredUsersRuns = this.props.usersRuns.filter(run => {
      return run.run_type.toLowerCase().includes(this.state.search) || 
        run.location.toLowerCase().includes(this.state.search) || 
        run.day && run.day.toLowerCase().includes(this.state.search) ||
        run.terrain.toLowerCase().includes(this.state.search) ||
        run.creator.toLowerCase().includes(this.state.search) ||
        run.description && run.description.toLowerCase().includes(this.state.search)
    })
    return (
      <View>
        <HeaderComponent header='Map' navigation={this.props.navigation} logout={true}/>

        <View style={{ justifyContent: 'center' }}>
          <SearchBar
            lightTheme={true}
            placeholder="Search"
            onChangeText={(search) => { this.setState({ search: search.toLowerCase() }) }}
            value={this.state.search}
          />
        </View>

        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.region}
            onRegionChangeCompleted={this.onRegionChange}
          >
            {filteredNewRuns.map((run) => (
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
            {filteredUsersRuns.map((run) => (
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
    authentication: state.authentication,
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