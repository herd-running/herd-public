import React, { Component } from 'react'
import { Header } from 'react-native-elements'
import styles from '../styles/Header'
import colors from '../constants/Colors'

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }

  render() {
    return (
      <Header
        outerContainerStyles={{borderBottomWidth: 0}}
        containerStyle={styles.header}
        placement="left"
        centerComponent={{ text: this.props.header, style: { color: colors.otherColor, fontSize: 25 } }}
        // rightComponent={{ icon: 'settings', color: colors.otherColor  }}
        barStyle="light-content"
      />
    )
  }
}

