import React, { Component } from 'react'
import { Header } from 'react-native-elements'
import styles from '../styles/Header'
import { Font } from 'expo';

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }
  // componentDidMount() {
  //   Font.loadAsync({
  //     'quicksand-regular': require('../assets/fonts/Quicksand-Medium.ttf'),
  //   })
  //   .then( () => {
  //     this.setState({
  //       fontLoaded: true
  //     })
  //   })
  // }

  render() {
    return (
    // this.state.fontLoaded ?
      <Header
        containerStyle={styles.header}
        placement="left"
        centerComponent={{ text: 'Herd', style: { color: '#f2b0e1', fontSize: 25 } }}
        //fontFamily: 'quicksand-regular'
        rightComponent={{ icon: 'settings', color: '#f2b0e1' }}
      />
      // :
      // null
    )
  }
}

