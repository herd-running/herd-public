import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-elements'

import styles from '../styles/JoinScreen'

export default class JoinScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  onPressSignUp = () => {
    const { navigate } = this.props.navigation
    navigate('Dashboard')
  }

  onPressLogIn = () => {
    const { navigate } = this.props.navigation
    navigate('Dashboard')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.jpg')} />

        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={this.onPressSignUp}
          title='Sign Up'
          type='outline'
        />

        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={this.onPressLogIn}
          title='Log in'
          type='outline'
        />

        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          style={styles.terms}
          title='Terms and Privacy'
          type='clear'
        />
      </View>

    )
  }
}
