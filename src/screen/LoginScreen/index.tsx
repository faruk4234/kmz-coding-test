/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useState } from 'react'

import {
  Alert,
  SafeAreaView, StyleSheet, Text, View
} from 'react-native'

import { AppContext } from '../../../App'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import colors from '../../const/colors'
import queries from '../../const/queries'
import Storage from '../../const/storage'

const LoginScreen = () => {
  const [ username, setUsername ] = useState('destek@akilliticaret.com')
  const [ password, setPassword ] = useState('at253545')

  const { setToken } = useContext(AppContext)

  const login = async () => {
    try {
      const data = await queries.login({ username, password })
      setToken(data?.data?.token)
      await Storage.setItem('accessToken', data?.data?.token)
    } catch (e) {
      console.error(e)
      Alert.alert('hata')
    }
  }

  return (
    <SafeAreaView style={{ margin: 20 }}>
      <View style={styles.header}>
        <Text style={styles.title} >Akıllı ticaret </Text>
        <Text style={styles.loginText} > Giriş yap </Text>
      </View>
      <CustomInput placeHolder='Kullanıcı Adı' value={username} onChangeValue={setUsername} />
      <CustomInput placeHolder='Password' value={password} onChangeValue={setPassword} isSecret />

      <CustomButton onPress={() => { void login() }} title='Giriş yap' ></CustomButton>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 30
  },
  title: { fontSize: 50, color: colors.primary },
  loginText: { fontSize: 30, color: colors.primary, marginTop: 20 }
})

export default LoginScreen
