/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useRoute } from '@react-navigation/native'

import Cart from './Cart'
import Home from './Home'
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
        tabBarStyle: {
          backgroundColor: colors.primary
        }
      }} >
        <Tab.Screen options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }} name="Home" component={Home} />
        <Tab.Screen options={{
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

  useEffect(() => {
    void getCategories()
  }, [])

  return (
    <CategoryProvider.Provider value={{ data, setData }} >

      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} data={data} />}
      >
        <Drawer.Screen name="Bottom" component={BottomStack}/>
      </Drawer.Navigator>
    </CategoryProvider.Provider>
  )
}

export default DrawerMenu
