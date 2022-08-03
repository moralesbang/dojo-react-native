import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black'
  },
  calcContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    flex: 1,
    gap: 16
  },
  calcInside: {
    alignSelf: 'flex-end'
  },
  calcResult: {
    color: 'white',
    fontSize: 80,
    textAlign: 'right'
  },
  calcPrevResult: {
    textAlign: 'right',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 40
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  }
})
