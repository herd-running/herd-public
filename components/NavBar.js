import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from '../styles/NavBar'

export default function NavBar() {
  return (
    <View style={styles.navigation}>
      <View style={{alignItems: 'center', color: '#f2b0e1' }}>
        <Icon
          name='run'
          type='material-community'
          size={35}
          color='#f2b0e1'
        />
        <Text style={{ color: '#f2b0e1' }}>Runs</Text>
      </View>
      <View style={{alignItems: 'center', color: '#f2b0e1' }}>
        <Icon
          name='account-group'
          type='material-community'
          size={40}
          color='#f2b0e1'
        />
        <Text style={{ color: '#f2b0e1' }}>Groups</Text>
      </View>
      <Icon
        name='plus-circle'
        type='material-community'
        size={40}
        color='#f2b0e1'
      />
      <View style={{alignItems: 'center', color: '#f2b0e1' }}>
        <Icon
          name='magnify'
          type='material-community'
          size={35}
          color='#f2b0e1'
        />
        <Text style={{ color: '#f2b0e1' }}>Discover</Text>
      </View>
      <View style={{alignItems: 'center', color: '#f2b0e1' }}>
        <Icon
          name='map'
          type='material-community'
          size={35}
          color='#f2b0e1'
        />
        <Text style={{ color: '#f2b0e1' }}>Map</Text>
      </View>
    </View>
  )
}