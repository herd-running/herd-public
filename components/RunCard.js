import React from 'react'
import { View, Text } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import Rating from './Rating'

export default function RunCard() {
  return (
    <View>
      <Card title='Long run at Discovery Park with Seattle Running Co.'>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text> Saturdays @ 7:00am </Text>
            <Icon
              name='autorenew'
              type='material'
              size={18}
              color='black'
            />
          </View>
          <Rating rating={5} size={20} />
        </View>
      </Card>

      <Card title='Tempo Run at Green Lake with Green Lake Running Group'>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text> Tuesdays @ 6:00pm </Text>
            <Icon
              name='autorenew'
              type='material'
              size={18}
              color='black'
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
          </View>
        </View>
      </Card>

      <Card title='Easy run at Alki with West Seattle Runners.'>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text> Monday @ 6:00am </Text>
            <Icon
              name='repeat-one'
              type='material'
              size={18}
              color='black'
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
          </View>
        </View>
      </Card>

      <Card title='Long run at Discovery Park with Seattle Running Co.'>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text> Saturdays @ 7:00am </Text>
            <Icon
              name='autorenew'
              type='material'
              size={18}
              color='black'
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
          </View>
        </View>
      </Card>

      <Card title='Long run at Discovery Park with Seattle Running Co.'>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text> Saturday @ 7:00am </Text>
            <Icon
              name='repeat-one'
              type='material'
              size={18}
              color='black'
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='#f2b0e1'
            />
          </View>
        </View>
      </Card>
    </View>
  )
}