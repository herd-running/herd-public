import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'

import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAuthentication } from '../actions/authentication'

import { BASE_URL } from '../../hidden'

import styles from '../styles/Login'
import colors from '../utils/Colors'

class SignupScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      reEnterPassword: '',
      picture_url: '',
      showError: false,
      errorMessage: ''
    }
  }

  handleSignUp = () => {
    if (!this.state.first_name || !this.state.last_name || !this.state.email || !this.state.username || !this.state.password || !this.state.reEnterPassword) {
      this.setState({
        errorMessage: 'Please enter all fields',
        showError: true,
      })
      return
    }

    else if (this.state.password !== this.state.reEnterPassword) {
      this.setState({
        errorMessage: 'Passwords do not match',
        showError: true,
        password: '',
        reEnterPassword: ''
      })
      return
    }

    const newUser = { ...this.state }

    axios.post(`${BASE_URL}/users`, newUser)
      .then((response) => {
        this.setState({
          showError: false
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => {
        if (error.response.data.message === 'Username already exists') {
          this.setState({
            errorMessage: 'Username already exists',
            showError: true,
            username: '',
            password: '',
            reEnterPassword: ''
          })
        }
        else {
          this.setState({
            errorMessage: 'Signup Failed',
            showError: true,
            username: '',
            password: '',
            reEnterPassword: ''
          })
        }
      })
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Image style={{ height: 100, width: 100, marginBottom: 20 }} source={require('../../assets/images/logo.png')} />

        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 20, marginTop: 10, color: colors.otherColor }}>First Name</Text>
          <TextInput
            onChangeText={(first_name) => this.setState({ first_name })}
            value={this.state.first_name}
            style={styles.textInput}
            returnKeyType='done'
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={false}
            autoCapitalize='none'
          />

          <Text style={{ fontSize: 20, marginTop: 10, color: colors.otherColor }}>Last Name</Text>
          <TextInput
            onChangeText={(last_name) => this.setState({ last_name })}
            value={this.state.last_name}
            style={styles.textInput}
            returnKeyType='done'
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={false}
            autoCapitalize='none'
          />

          <Text style={{ fontSize: 20, marginTop: 10, color: colors.otherColor }}>Email</Text>
          <TextInput
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            style={styles.textInput}
            returnKeyType='done'
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={false}
            autoCapitalize='none'
            textContentType='emailAddress'
          />

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

          <Text style={{ fontSize: 20, marginTop: 10, color: colors.otherColor }}>Re-enter Password</Text>
          <TextInput
            onChangeText={(reEnterPassword) => this.setState({ reEnterPassword })}
            value={this.state.reEnterPassword}
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
          onPress={this.handleSignUp}
          title='Sign Up'
        />

        {this.state.showError && <Text style={{ color: colors.otherColor, marginTop: 5, fontSize: 16 }}>{this.state.errorMessage}</Text>}

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={{ marginTop: 15 }}
        >
          <Text style={{ color: colors.otherColor, fontSize: 16 }}>Already a member? Log in.</Text>
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

export default connect(null, mapDispatchToProps)(SignupScreen)