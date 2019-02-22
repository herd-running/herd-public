import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import colors from '../utils/Colors'

export default function LeftHeaderComponent() {
  return (
    <View style={{ flexDirection: 'row', marginTop: 7 }}>
      <Icon
        name='logout'
        type='material-community'
        size={25}
        iconStyle={{ color: colors.otherColor }}
      />

      <Text style={{ color: colors.otherColor, marginTop: 4 }}>Log Out</Text>
    </View>
  )
}