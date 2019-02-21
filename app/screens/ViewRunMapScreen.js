import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { MapView } from 'expo'
const { Marker } = MapView

import HeaderComponent from '../components/Header'

import styles from '../styles/ViewRunMap'

export default class ViewRunMapScreen extends Component {
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

  onRegionChange = (region) => {
    this.setState({ region })
  }

  render() {
    const latitude = this.props.navigation.getParam('latitude', 47.6062)
    const longitude = this.props.navigation.getParam('longitude', -122.3321)
    const runId = this.props.navigation.getParam('runId', 0)

    return (
      <View>
        <HeaderComponent header='Map' />
        <TouchableOpacity
          style={{ backgroundColor: colors.backgroundColor, alignItems: 'flex-start', paddingLeft: 7, paddingBottom: 5 }}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon
            name='arrow-left'
            type='font-awesome'
            color={colors.otherColor}
            size={20}
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0221
            }}
            onRegionChangeCompleted={this.onRegionChange}
          >
            <Marker
              coordinate={{
                latitude,
                longitude
              }}
              pinColor='#6d3b84'
              onCalloutPress={() => this.props.navigation.navigate('ViewRun', { runId })}
            />
          </MapView>
        </View>
      </View>
    )
  }
}