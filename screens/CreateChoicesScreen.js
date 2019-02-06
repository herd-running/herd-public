import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import colors from '../constants/Colors';

import HeaderComponent from '../components/Header'

export default class CreateChoicesScreen extends Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    return (
      <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
        <HeaderComponent />
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CreateRun')}
              style={{ backgroundColor: colors.otherColor, borderRadius: 100, padding: 15, width: '35%' }}
            >
              <Icon
                name='run'
                type='material-community'
                color={colors.backgroundColor}
                size={80}
              />
            </TouchableOpacity>
            <Text style={{ color: colors.otherColor, fontSize: 16, paddingTop: 5 }}>Add a Run</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('CreateGroup')}
              style={{ backgroundColor: colors.otherColor, borderRadius: 100, padding: 15, width: '35%' }}
              >
              <Icon
                name='account-multiple'
                type='material-community'
                color={colors.otherColor}
                size={80}
              />
            </TouchableOpacity>
            <Text style={{ color: colors.otherColor, fontSize: 16, paddingTop: 5 }}>Add a Run</Text>
          </View>

        </View>
      </View>
    )
  }
}