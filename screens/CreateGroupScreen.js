import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import dismissKeyboard from 'react-native-dismiss-keyboard'

import HeaderComponent from '../components/Header'

import colors from '../constants/Colors'


export default class CreateGroupScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: ''
    }
  }

  handleCreateGroup = () => {

  }

  onEnterPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      dismissKeyboard()
    }
  }

  render() {
    return (
      <View>
        <HeaderComponent />
        <ScrollView style={{ marginLeft: 15, marginRight: 15 }}>
          <Text style={{ fontSize: 25, color: colors.backgroundColor, marginTop: 5, marginBottom: 10, fontWeight: 'bold' }}>New Group</Text>

          <Text style={{ fontSize: 20, marginTop: 10 }}>Name</Text>
          <TextInput
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5 }}
            returnKeyType='done'
            autoCapitalize='words'
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={false}
          />

          <Text style={{ fontSize: 20, marginTop: 10 }}>Description</Text>
          <TextInput
            onChangeText={(description) => this.setState({ description })}
            value={this.state.description}
            style={{ height: 250, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5, marginBottom: 10 }}
            multiline={true}
            numberOfLines={15}
            ref={(input) => { this.secondTextInput = input; }}
            returnKeyType='done'
            blurOnSubmit={true}
            onKeyPress={this.onEnterPress}
          />

          <Button
            title='Create Group!'
            onPress={this.handleCreateGroup}
            buttonStyle={{ backgroundColor: colors.backgroundColor, marginBottom: 10 }}
            titleStyle={{ color: colors.otherColor }}
          />

        </ScrollView>
      </View>
    )
  }
}