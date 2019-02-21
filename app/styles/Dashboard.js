import { StyleSheet } from 'react-native'
import colors from '../utils/Colors'

export default styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'flex-start'
  },
  buttonContainer : {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle : {
    borderColor: colors.otherColor,
    width: 105,
    height: 50,
    marginTop: 10
  },
  titleStyle: {
    marginLeft: 5,
    color: colors.otherColor,
    fontSize: 18
  }
})