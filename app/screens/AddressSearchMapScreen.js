import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapView, Location, Permissions } from 'expo'
const { Marker } = MapView

import { GOOGLE_PLACES_API_KEY } from '../../hidden'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setFormValue } from '../actions/createRunForm'

import HeaderComponent from '../components/Header'

import styles from '../styles/AddressSearch'
import colors from '../utils/Colors'

class AddressSearchMapScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      region: {
        latitude: 47.6062,
        longitude: -122.3321,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: {
        latitude: 47.6062,
        longitude: -122.3321
      },
      showList: 'block'
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

  handlePickLocation = (data, details) => {
    this.props.setFormValue('location', data.description)
    this.props.setFormValue('latitude', details.geometry.location.lat)
    this.props.setFormValue('longitude', details.geometry.location.lng)

    this.setState({
      region: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.18,
        longitudeDelta: 0.1
      },
      marker: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng
      },
      showList: 'none'
    })
  }

  handleMoveMarker = (event) => {
    this.props.setFormValue('latitude', event.nativeEvent.coordinate.latitude)
    this.props.setFormValue('longitude', event.nativeEvent.coordinate.longitude)

    this.setState({
      marker: event.nativeEvent.coordinate
    })
  }

  render() {
    return (
      <View>
        <HeaderComponent header='Choose starting location' navigation={this.props.navigation} logout={false}/>
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
        <GooglePlacesAutocomplete
          placeholder='Search Address or Place the Pin'
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed={true}
          fetchDetails={true}
          // not working
          onFocus={() => this.setState({ showList: 'block' })}
          onPress={(data, details) => this.handlePickLocation(data, details)}

          getDefaultValue={() => ''}

          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en',
            types: ['geocode', 'places']
          }}

          styles={{
            textInput: {
              height: 32,
              fontSize: 18
            },
            textInputContainer: {
              width: '100%',
              height: 45
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
            listView: {
              marginTop: 45,
              color: 'black',
              backgroundColor: 'white',
              position: 'absolute',
              display: this.state.showList
            }
          }}

          nearbyPlacesAPI='GooglePlacesSearch'

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />

        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.region}
            onRegionChangeComplete={region => {
              this.setState({ region })}}
          >
            <Marker draggable
              coordinate={this.state.marker}
              onDragEnd={this.handleMoveMarker}
              pinColor='#6d3b84'
            />

          </MapView>
          <View style={{ position: 'absolute', right: 10, bottom: 20 }}>
            <Button
              title='Save'
              onPress={() => this.props.navigation.goBack()}
              buttonStyle={{ backgroundColor: colors.backgroundColor }}
              titleStyle={{ color: colors.otherColor }}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    formValues: state.formValues
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setFormValue
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressSearchMapScreen)