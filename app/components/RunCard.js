import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'

import Rating from './Rating'

export default function RunCard({runType, location, group, day, time, rating}) {
  return (
    <Card title={`${runType} at ${location} with ${group}`}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text> {`${day}s @ ${time}`}</Text>
        </View>
        <Rating rating={rating} size={20} />
      </View>
    </Card>
  )

}