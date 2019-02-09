import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import colors from '../constants/Colors';

import HeaderComponent from '../components/Header'

export default class CreateChoicesScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isGroupLeader: true
    }
  }

  onPressAddRun = () => {
    if (this.state.isGroupLeader) {
      this.props.navigation.navigate('CreateRun')
    }
  }

  render = () => {
    return (
      <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
        <HeaderComponent header='Herd'/>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CreateGroup')}
              style={{ backgroundColor: colors.otherColor, borderRadius: 100, padding: 15, width: '35%' }}
            >
              <Icon
                name='account-multiple'
                type='material-community'
                color={colors.backgroundColor}
                size={80}
              />
            </TouchableOpacity>
            <Text style={{ color: colors.otherColor, fontSize: 20, paddingTop: 5 }}>Create a Group</Text>
          </View>

          {this.state.isGroupLeader ?
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={this.onPressAddRun}
                style={{ backgroundColor: colors.otherColor, borderRadius: 100, padding: 15 }}
              >
                <Icon
                  name='run'
                  type='material-community'
                  color={colors.backgroundColor}
                  size={80}
                />
              </TouchableOpacity>
              <Text style={{ color: colors.otherColor, fontSize: 20, paddingTop: 5 }}>Create a Run</Text>
            </View>
            :
            null
          }
        </View>
      </View>
    )
  }
}