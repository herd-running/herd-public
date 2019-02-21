import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'

export default function GroupCard({ name, description }) {
  
  return (
    <Card title={name}>
      <Text> {description} </Text>
    </Card>
  )
}