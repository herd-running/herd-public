import React from 'react'
import { ScrollView } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

export default function RunnersCard({firstName, lastName, picture}) {
  const runners = [
    {
      firstName: 'Sam',
      lastName: 'Violette',
      picture: 'https://pbs.twimg.com/profile_images/959545624084480000/3Y-QocO9.jpg'
    },
    {
      firstName: 'Jake',
      lastName: 'Hommer',
      picture: 'https://pbs.twimg.com/profile_images/1034666205389320192/vyXJP-71_400x400.jpg'
    },
    {
      firstName: 'Celia',
      lastName: 'Marshall',
      picture: 'https://avatars3.githubusercontent.com/u/39441243?s=460&v=4'
    }
  ]
  return (
    <ScrollView style={{ maxHeight: 300 }}>
      <Card containerStyle={{ padding: 0 }} >
        {
          runners.map((runner, i) => {
            return (
              <ListItem
                key={i}
                roundAvatar
                title={runner.firstName + ' ' + runner.lastName}
                leftAvatar={{ source: { uri: runner.picture } }}
              />
            );
          })
        }
      </Card>
    </ScrollView>
  )
}