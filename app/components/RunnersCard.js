import React from 'react'
import { View } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

export default function RunnersCard({runners}) {
  return (
    <View>
      <Card containerStyle={{ padding: 0 }} >
        {
          runners.map((runner, i) => {
            return (
              <ListItem
                key={runner.id}
                roundAvatar
                title={`${runner.first_name} ${runner.last_name}`}
                leftAvatar={{ source: { uri: runner.picture_url || 'https://cdn4.iconfinder.com/data/icons/web-app-flat-circular-icons-set/64/Iconos_Redondos_Flat_Usuario_Icn-512.png' } }}
              />
            );
          })
        }
      </Card>
    </View>
  )
}