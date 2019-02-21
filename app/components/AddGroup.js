import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import colors from '../utils/Colors'

export default class AddGroup extends Component {
  constructor(props) {
    super(props)
  }

  onPressAdd = () => {
    this.props.navigation.navigate('CreateGroup')
  }

  render = () => {
    return (
      <TouchableOpacity onPress={this.onPressAdd}>
        <Icon
          name='plus'
          type='material-community'
          size={40}
          color={colors.otherColor}
        // iconStyle={style}
        />
      </TouchableOpacity>
    )
  }
}