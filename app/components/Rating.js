import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import colors from '../constants/Colors'

export default function Rating({rating, size}) {
  let stars = []
  for (let i = 1; i <= rating; i++) {
    stars.push(
      <Icon
        key={i}
        name='star'
        type='font-awesome'
        size={size}
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