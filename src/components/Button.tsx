import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native'

const btnStyles = StyleSheet.create({
  buttonWrapper: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  buttonTxt: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    backgroundColor: 'transparent'
  }
})

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'base'
  onClick?: () => void
  style?: any
}

const variantStyles: Record<
  Required<ButtonProps>['variant'],
  {bgColor: ViewStyle['backgroundColor']; txtColor: TextStyle['color']}
> = {
  primary: {bgColor: 'orange', txtColor: 'white'},
  secondary: {bgColor: 'lightgray', txtColor: 'black'},
  base: {bgColor: 'gray', txtColor: 'white'}
}

function Button({children, onClick, variant = 'base', style}: ButtonProps) {
  const variantStyle = variantStyles[variant]
  const customTextStyle = {
    color: variantStyle.txtColor
  }
  const customBtnStyle = {
    backgroundColor: variantStyle.bgColor
  }
  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={StyleSheet.compose(
          btnStyles.buttonWrapper,
          StyleSheet.compose(customBtnStyle, style)
        )}
      >
        <Text style={StyleSheet.compose(btnStyles.buttonTxt, customTextStyle)}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button
