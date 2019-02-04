import React, { Component } from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import colors from '../constants/Colors'

export default class Rating extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let stars = []
    for (let i = 1; i <= this.props.rating; i++) {
      stars.push(
        <Icon
          key={i}
          name='star'
          type='font-awesome'
          size={this.props.size}
          color={colors.otherColor}
        />
      )
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        {stars}
      </View>
    )
  }
}