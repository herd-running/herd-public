import React from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import styles from '../styles/Dashboard'

export default function DashboardButtons() {
  return (
    <View style={styles.buttonContainer}>
      <Button
        icon={
          <Icon
            name='people'
            size={25}
            color='#f2b0e1'
            style={marginRight = 3}
          />
        }
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        onPress={this.onPressSignUp}
        title='Groups'
        type='outline'
      />
      <Button
        icon={
          <Icon
            name='map'
            size={25}
            color='#f2b0e1'
            style={marginRight = 3}
          />
        }
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        onPress={this.onPressSignUp}
        title='Map'
        type='outline'
      />
      <Button
        icon={
          <Icon
            name='calendar'
            type='font-awesome'
            size={20}
            color='#f2b0e1'
            style={marginRight = 3}
          />
        }
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        onPress={this.onPressSignUp}
        title='Calendar'
        type='outline'
      />
    </View>
  )
}