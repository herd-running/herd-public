import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'
import dismissKeyboard from 'react-native-dismiss-keyboard'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createGroup } from '../actions/groups'

import HeaderComponent from '../components/Header'

import colors from '../constants/Colors'

class CreateGroupScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      overlayIsVisible: false,
      overlayMessage: ''
    }
  }
//////replace 2 with user ID
  handleCreateGroup = () => {
    const newGroup = {
      name: this.state.name,
      description: this.state.description
    }
    this.props.createGroup(2, newGroup)

    this.setState({
      overlayMessage: 'Group Created!',
      overlayIsVisible: true
    })

    setTimeout(() => {
      this.setState({
        overlayMessage: null,
        overlayIsVisible: false
      })
      this.props.navigation.goBack()
    }, 1000)
  }

  onEnterPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      dismissKeyboard()
    }
  }

  render() {
    return (
      <View>
        <HeaderComponent header='Create' />
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
            style={{ height: 370, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5, marginBottom: 10 }}
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

          <Overlay
            isVisible={this.state.overlayIsVisible}
            windowBackgroundColor={colors.backgroundColor}
            overlayBackgroundColor={colors.otherColor}
            width="auto"
            height="auto"
          >
            <View style={{ minWidth: '80%', minHeight: '25%', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: colors.backgroundColor, fontSize: 24 }}>{this.state.overlayMessage}</Text>
            </View>
          </Overlay>

      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createGroup
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(CreateGroupScreen)