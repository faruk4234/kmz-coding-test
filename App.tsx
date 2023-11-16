/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { createContext, useState, useEffect } from 'react'

import { Alert } from 'react-native'

import queries, { type productItemInterface } from './src/const/queries'
import Storage from './src/const/storage'
import Screen from './src/screen'

export interface contextInterface {
  token?: string | null
  setToken?: any
  carts?: Array<{
    id?: number
    count?: number
    price?: number
  }>
  setCartItems?: any
  // eslint-disable-next-line no-irregular-whitespace
  selectedParentId: number | null
  setSelectedParentId: any
  onPlusOrDecreseButtonClick: any
}

const AppContext = createContext<contextInterface>({
  token: null,
  setToken: null,
  carts: null,
  setCartItems: null,
  selectedParentId: null,
  setSelectedParentId: null,
  onPlusOrDecreseButtonClick: null
})

const AppProvider = () => {
  const [ token, setToken ] = useState<string | null | undefined>()
  const [ carts, setCartItems ] = useState<[productItemInterface]>([])
  const [ selectedParentId, setSelectedParentId ] = useState()

  useEffect(() => {
    const fetchTokenAndCart = async () => {
      try {
        const fetchedToken = await Storage.getItem('accessToken')
        const fetchedCart = await Storage.getItem('cart')
        ;(Boolean(fetchedToken)) && setToken(fetchedToken)
        ;(Boolean(fetchedCart)) && setCartItems(fetchedCart)
      } catch (error) {
        console.error('Hata:', error)
      } finally {
      }
    }
    void fetchTokenAndCart()
  }, [])

  const updateCart = async (item: any, number: number) => {
    await queries.addCart(item.id, number)
  }

  const setTokenFunction = (token: string) => {
    void Storage.setItem('accessToken', token)
    setToken(token)
  }

  useEffect(() => {
    if (carts[1]) {
      console.log('sa')
      void Storage.setItem('cart', carts)
    }
  }, [ carts, setCartItems ])

  function onPlusOrDecreseButtonClick (item: productItemInterface, number: number) {
    try {
      void updateCart(item, number)
      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems.findIndex(cartItem => cartItem.id === item.id)
        if (existingItemIndex !== -1) {
          prevCartItems[existingItemIndex].count += number
        } else {
          prevCartItems.push({
            count: number,
            ...item
          })
        }

        return [ ...prevCartItems ]
      })
    } catch {
      Alert.alert('hata')
    }
  }

  return (
    <AppContext.Provider
      value={{
        token, setToken: setTokenFunction, carts, setCartItems, selectedParentId, setSelectedParentId, onPlusOrDecreseButtonClick
      }}>
      <Screen/>
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }

export default AppProvider
