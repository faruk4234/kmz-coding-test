import React from 'react'

import { StyleSheet, TouchableOpacity, Text } from 'react-native'

import colors from '../../const/colors'

interface customButtonInterface {
  title?: string
  backgroundColor?: string
  textColor?: string
  onPress?: () => void
  disable?: boolean
}

const CustomButton: React.FC<customButtonInterface> = ({
  title, onPress, backgroundColor = colors.primary, textColor = colors.white, disable = false
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} disabled={disable} onPress={onPress} style={[{ backgroundColor }, styles.container ]}>
      <Text style={[ styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default CustomButton
