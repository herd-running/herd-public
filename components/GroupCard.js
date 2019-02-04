import React from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'

export default function GroupCard() {
  return (
    <View>
      <Card title='Seattle Running Co.'>
        <Text> Lorem ipsum description It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </Text>
      </Card>

      <Card title='Green Lake Running Group'>
        <Text> Lorem ipsum description It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </Text>
      </Card>

      <Card title='West Seattle Runners'>
        <Text> Lorem ipsum description It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </Text>
      </Card>

      <Card title="Jill's Sunday Runday">
        <Text> Lorem ipsum description It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </Text>
      </Card>

    </View>
  )
}