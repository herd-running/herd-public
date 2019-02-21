import { StyleSheet } from 'react-native'
import colors from '../utils/Colors'

export default styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  textInput : { 
    height: 40, 
    width: 250, 
    borderColor: colors.otherColor, 
    borderWidth: 0.5, 
    fontSize: 18, 
    paddingLeft: 5, 
    marginBottom: 10, 
    color: colors.otherColor, 
    borderRadius: 4 
  }
})