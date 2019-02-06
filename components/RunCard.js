import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import Rating from './Rating'

export default class RunCard extends Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    return (
      <View>

          <Card title='Long run at Discovery Park with Seattle Running Co.'>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text> Saturdays @ 7:00am </Text>
              </View>
              <Rating rating={5} size={20} />
            </View>
          </Card>

        <Card title='Tempo Run at Green Lake with Green Lake Running Group'>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text> Tuesdays @ 6:00pm </Text>
            </View>
            <View >
              <Rating rating={5} size={20} />
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
            <Rating rating={3} size={20} />
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
            <Rating rating={4} size={20} />
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
            <Rating rating={3} size={20} />
          </View>
        </Card>
      </View>
    )
  }
}