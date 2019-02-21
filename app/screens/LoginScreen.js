import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { SecureStore } from 'expo'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAuthentication } from '../actions/authentication'

import { getUserId, postLogin } from '../utils/authorization'

import styles from '../styles/Login'
import colors from '../utils/Colors'

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'cmarshall',
      password: 'test',
      showError: false
    }
  }

  handleLogIn = () => {
    postLogin({
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        return SecureStore.setItemAsync('token', response.data.token)
      })
      .then(() => {
        return getUserId()
      })
      .then(response => {
        this.setState({ showErrorMessage: false })
        this.props.setAuthentication(response.data.id)
        this.props.navigation.navigate('DashboardRuns')
      })
      .catch(() => {
        this.setState({ showError: true })
      })
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Image style={{ height: 300, width: 300, marginBottom: 70 }} source={require('../../assets/images/logo.png')} />

        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 20, marginTop: 10, color: colors.otherColor }}>Username</Text>
          <TextInput
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            style={styles.textInput}
            returnKeyType='done'
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={false}
            autoCapitalize='none'
            textContentType='username'
          />

          <Text style={{ fontSize: 20, marginTop: 10, color: colors.otherColor }}>Password</Text>
          <TextInput
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            style={styles.textInput}
            ref={(input) => { this.secondTextInput = input; }}
            returnKeyType='done'
            blurOnSubmit={true}
            autoCapitalize='none'
            textContentType='password'
            secureTextEntry={true}
          />
        </View>

        <Button
          buttonStyle={{ backgroundColor: colors.otherColor, width: 200, marginTop: 10 }}
          titleStyle={{ color: colors.backgroundColor }}
          onPress={this.handleLogIn}
          title='Log in'
        />

        {this.state.showError && <Text style={{ color: colors.otherColor, marginTop: 5, fontSize: 16 }}>Login Failed</Text>}

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Signup')}
          style={{ marginTop: 15 }}
        >
          <Text style={{ color: colors.otherColor, fontSize: 16 }}>Not a member? Sign Up.</Text>
        </TouchableOpacity>

      </View>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setAuthentication
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginScreen)