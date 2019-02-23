import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'

import { SecureStore } from 'expo'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAuthentication } from '../actions/authentication'

import LeftHeaderComponent from './LeftHeaderComponent'

import styles from '../styles/Header'
import colors from '../utils/Colors'

class HeaderComponent extends Component {
  constructor(props) {
    super(props)
  }

  handleLogout = () => {
    SecureStore.deleteItemAsync('token')
      .then ( () => {
        this.props.setAuthentication(null)
        this.props.navigation.navigate('Landing')
      })
  }

  render = () => {
    return (
      <Header
        outerContainerStyles={{ borderBottomWidth: 0 }}
        containerStyle={styles.header}
        placement="left"
        centerComponent={{ text: this.props.header, style: { color: colors.otherColor, fontSize: 25 } }}
        rightComponent={
          this.props.logout &&
          <TouchableOpacity onPress={this.handleLogout}>
            <LeftHeaderComponent />
          </TouchableOpacity>}
        barStyle="light-content"
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setAuthentication
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(HeaderComponent)


