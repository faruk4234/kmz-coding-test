/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, {
  useCallback, useRef, useState
} from 'react'

import {
  StyleSheet, Text, TextInput, TouchableOpacity
} from 'react-native'

import colors from '../../const/colors'

interface InputInterface {
  value?: string | ''
  placeHolder?: string
  onChangeValue?: any
  isSecret?: boolean
}

const CustomInput: React.FC<InputInterface> = ({
  value, onChangeValue, isSecret, placeHolder
}) => {
  const [ text, setText ] = useState(value)
  const textInputRef = useRef<TextInput>(null)

  const changeValue = useCallback((txt: string) => {
    onChangeValue?.(txt)
    setText(txt)
  }, [ onChangeValue ])

  const handleTouchableOpacityPress = () => {
    textInputRef.current?.focus()
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleTouchableOpacityPress}
    >
      {text && <Text style={styles.placeHolder}>{placeHolder}</Text>}
      <TextInput
        ref={textInputRef}
        value={text}
        secureTextEntry={isSecret}
        onChangeText={changeValue}
        placeholder= {placeHolder}
      />

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: colors.lightBlack,
    height: 60,
    borderWidth: 0.4,
    marginTop: 20
  },
  placeHolder: {
    fontSize: 10,
    color: colors.lightBlack,
    opacity: 0.4,
    marginBottom: 3
  }

})

export default CustomInput
