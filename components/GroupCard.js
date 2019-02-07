import React from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'

export default function GroupCard({ title, description }) {
  
  return (
    <Card title={title}>
      <Text> {description} </Text>
    </Card>
  )
}