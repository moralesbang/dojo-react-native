import {StatusBar} from 'expo-status-bar'
import {Text, View} from 'react-native'
import CalculatorScreen from './src/screens/CalculatorScreen'
import {styles} from './src/themes/styles'

export default function App() {
  return (
    <View style={styles.container}>
      <CalculatorScreen />
    </View>
  )
}
