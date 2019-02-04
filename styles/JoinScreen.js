import { StyleSheet } from 'react-native'
import colors from '../constants/Colors'

export default styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  buttonStyle : {
    borderColor: colors.otherColor,
    width: 200,
    marginTop: 10
  },
  titleStyle: {
    color: colors.otherColor
  },
  terms : {
    justifyContent: 'flex-end'
  }
})