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
      <Card title={`${this.props.runType} at ${this.props.location} with ${this.props.group}`}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text> {`${this.props.day}s @ ${this.props.time}`}</Text>
          </View>
          <Rating rating={this.props.rating} size={20} />
        </View>
      </Card>
    )
  }
}