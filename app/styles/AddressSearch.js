import { StyleSheet, Dimensions } from 'react-native'
const {height} = Dimensions.get('window')

export default styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 158,
    bottom: 0,
    height: height - 158,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    zIndex: -1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
 })