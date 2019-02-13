import React, { Component } from 'react'
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { MapView, Location, Permissions } from 'expo'
const { Marker } = MapView

import HeaderComponent from '../components/Header'

import styles from '../styles/MapScreen'
import colors from '../constants/Colors'

export default class MapScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }

  componentWillMount() {
    this.getLocationAsync();
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
    const markers = [
      {
        group: 'Seattle Running Club',
        runType: 'Long Run',
        latlng: {
          latitude: 47.6609,
          longitude: -122.4153
        }
      },
      {
        group: 'Green Lake Running Group',
        runType: 'Tempo Run',
        latlng: {
          latitude: 47.6787,
          longitude: -122.3296
        }
      },
      {
        group: 'Green Lake Running Group',
        runType: 'Base Run',
        latlng: {
          latitude: 47.6797,
          longitude: -122.3286
        }
      },
      {
        group: 'Green Lake Running Group',
        runType: 'Walk/Run',
        latlng: {
          latitude: 47.6797,
          longitude: -122.3286
        }
      },
      {
        group: 'West Seattle Runners',
        runType: 'Easy Run',
        latlng: {
          latitude: 47.5935,
          longitude: -122.3908
        }
      },
      {
        group: 'Seattle Running Club',
        runType: 'Interval Run',
        latlng: {
          latitude: 47.6285,
          longitude: -122.2940
        }
      },
      {
        group: 'Seattle Running Club',
        runType: 'Walk/Run',
        latlng: {
          latitude: 47.6152,
          longitude: -122.3553
        }
      },
      {
        group: 'Jill\'s Sunday Runday',
        runType: 'Long Run',
        latlng: {
          latitude: 47.6574,
          longitude: -122.4116
        }
      },
      {
        group: 'Seattle Running Club',
        runType: 'Fartlek Run',
        latlng: {
          latitude: 47.6463,
          longitude: -122.3348
        }
      }
    ]

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
            {markers.map((marker, i) => (
              <Marker
                key={i}
                coordinate={marker.latlng}
                title={marker.group}
                description={marker.runType}
                pinColor='#6d3b84'
                onCalloutPress={() => this.props.navigation.navigate('ViewRun', { runId: run.id })}
              />
            ))}
          </MapView>
        </View>
      </View>
    )
  }
}

