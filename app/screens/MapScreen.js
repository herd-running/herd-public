import React, { Component } from 'react'
import { Stylesheet, View } from 'react-native'
import { SearchBar } from 'react-native-elements'
// import Mapbox from '@mapbox/react-native-mapbox-gl';

import HeaderComponent from '../components/Header'

// Mapbox.setAccessToken('sk.eyJ1IjoiY2VsaWFtYXJzaGFsbCIsImEiOiJjanJ2MXBqYWcwZ2h6NGFtaWh5cmJlZmQwIn0.nb4VLTrwXX9J6kySy2tl7g')

export default class MapScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {

    return (
      <View style={styles.container}>
        <HeaderComponent header='Map' />

        <View style={{ justifyContent: 'center' }}>
          <SearchBar
            lightTheme={true}
            placeholder="Search"
            onChangeText={(search) => { this.setState({ search }) }}
            value={this.state.search}
            containerStyle={{ marginLeft: 10, marginRight: 10 }}
          />

          {/* <View style={{flex: 1}}>
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Street}
              zoomLevel={15}
              centerCoordinate={[11.256, 43.770]}
              style={{flex: 1}}>
            </Mapbox.MapView>
          </View> */}

        </View>
      </View>
    )
  }
}

