import { StyleSheet, Dimensions } from 'react-native'
const {height} = Dimensions.get('window')

export default styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 145,
    bottom: 0,
    height: height - 145,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
 });