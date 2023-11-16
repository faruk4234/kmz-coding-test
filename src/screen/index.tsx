/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import BottomStack from './BottomStack'
import LoginScreen from './LoginScreen'
import { AppContext } from '../../App'

const Stack = createStackNavigator()

const Screen = () => {
  const { token } = useContext(AppContext)

  return (
    <NavigationContainer>
      <Stack.Navigator >
        {
          (token == null)
            ? <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
            : <>
              <Stack.Screen options={{ headerShown: false }} name="BottomStack" component={BottomStack} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Screen
