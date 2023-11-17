/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useMemo } from 'react'

import {
  Alert,
  FlatList, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions
} from 'react-native'

import { AppContext } from '../../../../App'
import colors from '../../../const/colors'
import formatCurrency from '../../../hook/FormatCurrency'
import { type productListItemInterface } from '../Home/ProductListItem'

const Cart = () => {
  const { carts, onPlusOrDecreseButtonClick } = useContext(AppContext)
  const { width } = useWindowDimensions()

  const totalAmount = useMemo(() => {
    const ammount = carts?.reduce((acc, cartItem) => {
      acc += cartItem?.price * cartItem?.count ?? 0

      return acc
    }, 0)

    return formatCurrency(ammount)
  }, [ carts ])

  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ height: '95%' }}>
          <FlatList
            contentContainerStyle={{ }}
            ListEmptyComponent={() => <Text style={styles.empty}>Henüz sepetinizde bir ürün yok</Text>}
            data={carts?.filter((item) => item?.count > 0)}
            renderItem={({ item }: productListItemInterface) => {
              return (
                <View style={[ styles.container, { height: width * 0.36 }]}>
                  <Image
                    source={{ uri: item.productImages?.[0].imagePath }}
                    style={{
                      width: width * 0.35,
                      height: width * 0.35,
                      padding: 1,
                      borderRadius: 10
                    }}/>
                  <View style={styles.header}>
                    <View style={styles.row}>
                      <Text style={{ maxWidth: width * 0.4 }}>{item?.stockName}</Text>
                      <TouchableOpacity onPress={() => { onPlusOrDecreseButtonClick(item, -item.count) }}>
                        <Image style={styles.thrash} source={require('../../../assets/thrash.png')} />
                      </TouchableOpacity>
                    </View>
                    <Text style={{ color: colors.lightBlack, fontSize: 13 }}> { formatCurrency(item?.price * item?.count)}</Text>

                    <View style={styles.countAndPriceContainer}>
                      <TouchableOpacity
                        onPress={() => { onPlusOrDecreseButtonClick(item, -1) }} style={styles.countSwitch}>
                        <Text style={styles.icon}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.count}>{item?.count}</Text>

                      <TouchableOpacity
                        onPress={() => { onPlusOrDecreseButtonClick(item, 1) }} style={styles.countSwitch}>
                        <Text style={styles.icon}>+</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              )
            }} />
        </View>

      </View>
      <Text style={styles.totalAmmmount}>Toplam {totalAmount}</Text>
    </>

  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    borderColor: colors.primary

  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    padding: 15
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  countAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  countSwitch: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: { color: colors.white, fontSize: 25, textAlign: 'center' },
  count: { fontSize: 20, color: colors.primary, fontWeight: 'bold' },
  empty: {
    fontSize: 30, marginTop: 50, color: colors.primary, textAlign: 'center'
  },
  totalAmmmount: {
    fontSize: 20,
    color: colors.primary,
    marginLeft: 20
  },
  thrash: { height: 17, width: 15 }
})
export default Cart
