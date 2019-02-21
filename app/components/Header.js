import React from 'react'
import { Header } from 'react-native-elements'

import styles from '../styles/Header'
import colors from '../utils/Colors'

export default function HeaderComponent({header, component = null}) {

  return (
    <Header
      outerContainerStyles={{ borderBottomWidth: 0 }}
      containerStyle={styles.header}
      placement="left"
      centerComponent={{ text: header, style: { color: colors.otherColor, fontSize: 25 } }}
      rightComponent={component}
      barStyle="light-content"
    />
  )
}

// { icon: 'settings', color: colors.otherColor }


