import React, { Component } from 'react'
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements'
// import Mapbox from '@mapbox/react-native-mapbox-gl';
import { MapView } from 'expo'

import HeaderComponent from '../components/Header'

import styles from '../styles/MapScreen'

// Mapbox.setAccessToken('sk.eyJ1IjoiY2VsaWFtYXJzaGFsbCIsImEiOiJjanJ2MXBqYWcwZ2h6NGFtaWh5cmJlZmQwIn0.nb4VLTrwXX9J6kySy2tl7g')

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

  updateSearch = search => {
    this.setState({ search });
  };

  onRegionChange = (region) => {
    this.setState({ region });
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
          onRegionChange={this.onRegionChange}
          />
          </View>
      
        {/* <View style={{flex: 1}}>
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Street}
              zoomLevel={15}
              centerCoordinate={[11.256, 43.770]}
              style={{flex: 1}}>
            </Mapbox.MapView>
          </View> */}

      </View>
    )
  }
}

