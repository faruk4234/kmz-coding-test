/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useEffect, useState } from 'react'

import {
  View, TouchableOpacity, Text, ImageBackground, useWindowDimensions, StyleSheet
} from 'react-native'

import { AppContext } from '../../../../App'
import colors from '../../../const/colors'
import formatCurrency from '../../../hook/FormatCurrency'

export interface productListItemInterface {
  item: {
    id: number | undefined
    stockName: string
    price: number
    count?: number
    productImages?: Array<{
      imagePath?: string
    }>
  }
}
const ProductListItem: React.FC<productListItemInterface> = ({ item }) => {
  const { width } = useWindowDimensions()

  const { carts, onPlusOrDecreseButtonClick } = useContext(AppContext)

  const [ amount, setAmount ] = useState(0)

  useEffect(() => {
    const cartItem = carts?.find((cart) => cart.id === item.id)

    if (cartItem?.count != null) {
      setAmount(cartItem?.count)
    } else {
      setAmount(0)
    }
  }, [ carts ])

  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <TouchableOpacity
          onPress={() => { onPlusOrDecreseButtonClick(item, -1) }} disabled={amount === 0}
          style={[ styles.countContainer, { opacity: amount }]}
        >
          <Text style={styles.plusText}>-</Text>
        </TouchableOpacity>
        <Text style={[ styles.ammountText, { opacity: amount }]}>{amount}</Text>
        <TouchableOpacity onPress={() => { onPlusOrDecreseButtonClick(item, +1) }} style={styles.countContainer}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>

      </View>
      <ImageBackground style={{ height: width * 0.28, width: width * 0.28, margin: 3 }} source={{ uri: item.productImages?.[0].imagePath }}>

      </ImageBackground>
      <Text numberOfLines={2} style={[ styles.name, { maxWidth: width * 0.25 }]}>{item.stockName}</Text>

      <View style={styles.priceContainer}>

        <Text style={styles.priceText}>{formatCurrency(item.price)}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5

  },
  name: {
    fontSize: 10,
    margin: 5,
    marginVertical: 10,
    height: 30
  },
  childContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5
  },
  ammountText: {
    marginTop: 5,
    color: colors.primary,
    fontSize: 20
  },
  countContainer: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 20
  },
  priceContainer: {
    margin: 5,
    alignItems: 'flex-end'
  },
  priceText: {
    fontSize: 12,
    color: colors.primary,
    alignItems: 'flex-end'
  }
})

export default ProductListItem
