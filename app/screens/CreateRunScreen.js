import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown'

import HeaderComponent from '../components/Header'

import { runType, day, time, pace, terrain } from '../constants/CreateRunOptions'
import colors from '../constants/Colors'

export default class CreateRunScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      group: '',
      runType: '',
      day: '',
      time: '',
      pace: '',
      terrain: '',
      location: '',
      distance: '',
      description: ''
    }
  }

  handleCreateRun = () => {

  }

  onEnterPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      dismissKeyboard()
    }
  }

  render() {
    const groups = [
      {
        value: 'Seattle Running Club'
      },
      {
        value: 'Jill\'s Sunday Runday'
      }
    ]
    return (
      <View style={{paddingBottom: 120}}>
        <HeaderComponent header='Herd'/>
        <TouchableOpacity 
          style={{ backgroundColor: colors.backgroundColor, alignItems: 'flex-start', paddingLeft: 10, paddingBottom: 5 }}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon
            name='arrow-left'
            type='font-awesome'
            color={colors.otherColor}
            size={20}
          />
        </TouchableOpacity>
        {/* How can I made the scroll sticky? */}
        <ScrollView style={{ marginLeft: 30, marginRight: 30 }}>
            <Text style={{ fontSize: 25, color: colors.backgroundColor, marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>New Run</Text>

            <Dropdown
              label='Group'
              data={groups}
              fontSize={20}
              labelFontSize={18}
              itemCount={5}
              animationDuration={0}
              onChangeText={(group) => this.setState({ group })}
            />

            {/* How do I reduce the animation on the dropdown? */}
            <Dropdown
              label='Run Type'
              data={runType}
              fontSize={20}
              labelFontSize={18}
              itemCount={7}
              animationDuration={0}
              onChangeText={(runType) => this.setState({ runType })}
            />

            <Dropdown
              label='Day of the Week'
              data={day}
              fontSize={20}
              labelFontSize={18}
              itemCount={7}
              onChangeText={(day) => this.setState({ day })}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ width: 120 }}>
                <Dropdown
                  label='Time'
                  data={time}
                  fontSize={20}
                  labelFontSize={18}
                  itemCount={7}
                  onChangeText={(time) => this.setState({ time })}
                />
              </View>
              <View style={{ width: 100 }}>
                <Dropdown
                  label='am/pm'
                  data={[{ value: 'am' }, { value: 'pm' }]}
                  fontSize={20}
                  labelFontSize={18}
                  itemCount={2}
                  onChangeText={(am_pm) => this.setState({ am_pm })}
                />
              </View>
            </View>

            <Dropdown
              label='Pace'
              data={pace}
              fontSize={20}
              labelFontSize={18}
              itemCount={7}
              onChangeText={(pace) => this.setState({ pace })}
            />

            <Dropdown
              label='Terrain'
              data={terrain}
              fontSize={20}
              labelFontSize={18}
              itemCount={7}
              onChangeText={(terrain) => this.setState({ terrain })}
            />

            {/* How can I get the keyboard to not cover the input? */}
            <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Location</Text>
            <TextInput
              onChangeText={(location) => this.setState({ location })}
              value={this.state.location}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5 }}
              returnKeyType='done'
            />

            <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Distance (optional)</Text>
            <TextInput
              onChangeText={(distance) => this.setState({ distance })}
              value={this.state.distance}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5 }}
              returnKeyType='done'
            />

            <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Description (optional)</Text>
            <TextInput
              onChangeText={(description) => this.setState({ description })}
              value={this.state.description}
              style={{ height: 80, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5, marginBottom: 10 }}
              returnKeyType='done'
              multiline={true}
              numberOfLines={10}
              blurOnSubmit={true}
              onKeyPress={this.onEnterPress}
            />

          <Button
            title='Create Run!'
            onPress={this.handleCreateRun}
            buttonStyle={{ backgroundColor: colors.backgroundColor, marginBottom: 10 }}
            titleStyle={{ color: colors.otherColor }}
          />

        </ScrollView>
      </View>
    )
  }

}