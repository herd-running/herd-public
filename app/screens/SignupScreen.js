import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
      errorMessage: '',
      avoidView: 0
    }
  }

  emailValidate = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email)
  }

  handleSignUp = () => {
    if (!this.state.first_name || !this.state.last_name || !this.state.email || !this.state.username || !this.state.password || !this.state.reEnterPassword) {
      Alert.alert('Please enter all fields', null, [{ text: 'OK' }], { cancelable: false })
      return
    }

    if(!this.emailValidate(this.state.email)) {
      Alert.alert('Please enter valid email address', null, [{ text: 'OK' }], { cancelable: false })
      return
    }

    else if (this.state.password !== this.state.reEnterPassword) {
      Alert.alert('Passwords do not match', null, [{ text: 'OK' }], { cancelable: false })
      this.setState({
        password: '',
        reEnterPassword: ''
      })
      return
    }

    const newUser = { ...this.state }

    axios.post(`${BASE_URL}/users`, newUser)
      .then(() => {
        this.setState({
          showError: false
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => {
        if (error.response.data.message === 'Username already exists') {
          Alert.alert('Username already exists', null, [{ text: 'OK' }], { cancelable: false })

          this.setState({
            username: '',
            password: '',
            reEnterPassword: ''
          })
        }
        else {
          Alert.alert('Signup failed', null, [{ text: 'OK' }], { cancelable: false })

          this.setState({
            username: '',
            password: '',
            reEnterPassword: ''
          })
        }
      })
  }

  render = () => {
    return (
      <View style={{ ...styles.container, marginTop: parseInt(this.state.avoidView) }}>
        <Image style={{ height: 100, width: 100, marginBottom: 10, marginTop: 40 }} source={require('../../assets/images/logo.png')} />

        <KeyboardAwareScrollView extraScrollHeight={5}>
          <Text style={{ fontSize: 20, marginTop: 10, color: colors.otherColor }}>First Name</Text>
          <TextInput
            onChangeText={(first_name) => this.setState({ first_name })}
            value={this.state.first_name}
            style={styles.textInput}
            returnKeyType='done'
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={true}
          />

          <Text style={{ fontSize: 20, marginTop: 10, color: colors.otherColor }}>Last Name</Text>
          <TextInput
            onChangeText={(last_name) => this.setState({ last_name })}
            value={this.state.last_name}
            style={styles.textInput}
            returnKeyType='done'
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={true}
          />

          <Text style={{ fontSize: 20, marginTop: 10, color: colors.otherColor }}>Email</Text>
          <TextInput
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            style={styles.textInput}
            returnKeyType='done'
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={true}
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
            blurOnSubmit={true}
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

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button
              buttonStyle={{ backgroundColor: colors.otherColor, width: 200, marginTop: 10 }}
              titleStyle={{ color: colors.backgroundColor }}
              onPress={this.handleSignUp}
              title='Sign Up'
            />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={{ marginTop: 15 }}
            >
              <Text style={{ color: colors.otherColor, fontSize: 16 }}>Already a member? Log in.</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View >
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setAuthentication
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignupScreen)