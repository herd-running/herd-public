// import React, { Component } from 'react'
// import { View, Text, TouchableHighlight } from 'react-native'
// import { Icon } from 'react-native-elements'
// import styles from '../styles/NavBar'
// import colors from '../constants/Colors'

export default class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  navigateToRuns = () => {
    console.log(this.props)
    // const { navigate } = this.props.navigation
    // navigate('Join')
  }

  render() {

    return (
      <View style={styles.navigation}>
        <View style={{ alignItems: 'center' }}>
          <TouchableHighlight onPress={this.navigateToRuns} underlayColor={colors.otherColor}>
            <Icon
              name='run'
              type='material-community'
              size={35}
              color={colors.otherColor}
            />
          </TouchableHighlight>
          <Text style={{ color: colors.otherColor }}>Runs</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Icon
            name='account-group'
            type='material-community'
            size={40}
            color={colors.otherColor}
          />
          <Text style={{ color: colors.otherColor }}>Groups</Text>
        </View>

        <Icon
          name='plus-circle'
          type='material-community'
          size={40}
          color={colors.otherColor}
        />

        <View style={{ alignItems: 'center' }}>
          <Icon
            name='magnify'
            type='material-community'
            size={35}
            color={colors.otherColor}
          />
          <Text style={{ color: colors.otherColor }}>Discover</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Icon
            name='map'
            type='material-community'
            size={35}
            color={colors.otherColor}
          />
          <Text style={{ color: colors.otherColor }}>Map</Text>
        </View>

      </View>
    )
  }
}