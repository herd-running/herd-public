import React, { Component } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import { Button } from 'react-native-elements'

import styles from '../styles/JoinScreen'

export default class JoinScreen extends Component {
  // static navigationOptions = {
  //   header: null,
  // };
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  onPressSignUp = () => {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  onPressLogIn = () => {
    const { navigate } = this.props.navigation
    navigate('Home')
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
