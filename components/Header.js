import React, { Component } from 'react'
import { Header } from 'react-native-elements'
import styles from '../styles/Header'
import colors from '../constants/Colors'
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
        outerContainerStyles={{borderBottomWidth: 0}}
        containerStyle={styles.header}
        placement="left"
        centerComponent={{ text: 'Herd', style: { color: colors.otherColor, fontSize: 25 } }}
        //fontFamily: 'quicksand-regular'
        rightComponent={{ icon: 'settings', color: colors.otherColor  }}
        barStyle="light-content"
      />
      // :
      // null
    )
  }
}

