/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useEffect, useState } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Cart from './Cart'
import Home from './Home'
import { AppContext } from '../../../App'
import colors from '../../const/colors'
import queries, { type categoriesInterface } from '../../const/queries'
import CategoryProvider from '../../hook/CategoryProvider'
import DrawerContent from '../DrawerMenu/DrawerMenu'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const BottomStack = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: colors.lightBlack,
        tabBarInactiveTintColor: colors.white,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: colors.primary
        }
      }} >
        <Tab.Screen options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={{ height: 20, width: 20, tintColor: color }}
              source={require('../../assets/home.png')}

            />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }} name="Home" component={Home} />
        <Tab.Screen options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={{ height: 20, width: 20, tintColor: color }}
              source={require('../../assets/cart.png')}

            />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }} name="Cart" component={Cart} />
      </Tab.Navigator>
    </>
  )
}

const DrawerMenu = () => {
  const [ data, setData ] = useState<categoriesInterface>()
  const getCategories = async () => {
    const categoryData = await queries.categories()
    setData(categoryData)
  }

  const { setToken } = useContext(AppContext)

  useEffect(() => {
    void getCategories()
  }, [])

  return (
    <CategoryProvider.Provider value={{ data, setData }} >

      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} data={data} />}
      >
        <Drawer.Screen options={{
          title: 'Ömer Faruk ÇETINER',
          headerRight: () => (
            <TouchableOpacity onPress={() => { setToken(null) }}>
              <Image
                style={styles.exit}
                source={require('../../assets/exit.png')}
              />
            </TouchableOpacity>
          )
        }} name="Bottom"
        component={BottomStack}/>
      </Drawer.Navigator>
    </CategoryProvider.Provider>
  )
}

const styles = StyleSheet.create({
  exit: {
    height: 20,
    width: 20,
    marginRight: 10,
    tintColor: colors.primary
  }
})

export default DrawerMenu
