import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import colors from '../utils/Colors'

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