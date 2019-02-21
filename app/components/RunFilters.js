import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'

import colors from '../utils/Colors'

export default class RunFilters extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showPicker: false,
      pickerCategory: 'runType'
    }
  }

  generatePicker = () => {
    const runType = [
      {
        title: 'Long',
        value: 'long'
      },
      {
        title: 'Short',
        value: 'short'
      },
      {
        title: 'Tempo',
        value: 'tempo'
      },
      {
        title: 'Easy',
        value: 'easy'
      }
    ]

  }

  togglePicker = () => {
    this.setState({
      showPicker: !this.state.showPicker
    })
  }

  render() {
    const filters = ['Day', 'Pace', 'Type', 'Terrain']
    return (
      <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
        <ScrollView horizontal={true}>
          {filters.map((filter, i) => {
            return (
              <Button
                title={filter}
                key={i}
                onPress={this.togglePicker}
                buttonStyle={{ backgroundColor: colors.otherColor, width: 81, marginLeft: 10 }}
                titleStyle={{ color: colors.backgroundColor }}
              />
            )
          })
          }
        </ScrollView>
      </View>
    )
  }
}