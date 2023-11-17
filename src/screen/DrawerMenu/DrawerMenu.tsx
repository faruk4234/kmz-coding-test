/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext } from 'react'

import { useNavigation } from '@react-navigation/native'
import {
  FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity
} from 'react-native'

import { AppContext } from '../../../App'
import colors from '../../const/colors'
import { type categoryItemInterface } from '../BottomStack/Home/CategoryItem'

const DrawerContent = ({ data }: categoryItemInterface | any) => {
  const { selectedParentId, setSelectedParentId } = useContext(AppContext)

  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ width: '100%' }}>
      <FlatList
        data={data?.data.categories}
        renderItem={({ item }) => (

          <TouchableOpacity
            onPress={() => {
              setSelectedParentId(item.id),
              navigation.navigate('Home')
            }}
            style={[ styles.itemContainer,
              { backgroundColor: selectedParentId === item.id ? colors.primary : null }]}
          >

            <Text
              style={{ marginLeft: 20, fontSize: 16, color: selectedParentId === item.id ? colors.white : null }}>{item.categoryName}</Text>

            <Image
              style={{
                height: 15,
                width: 12,
                tintColor: selectedParentId === item.id ? colors.white : null
              }}
              source={require('../../assets/right.png')}

            />
          </TouchableOpacity>) } />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 50,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.border,
    flexDirection: 'row',
    paddingRight: 10
  }
})

export default DrawerContent
