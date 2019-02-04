import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#4d336d',
    justifyContent: 'flex-start'
  },
  buttonContainer : {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle : {
    borderColor: '#f2b0e1',
    width: 105,
    height: 50,
    marginTop: 10
  },
  titleStyle: {
    marginLeft: 5,
    color: '#f2b0e1',
    fontSize: 18
  }
})