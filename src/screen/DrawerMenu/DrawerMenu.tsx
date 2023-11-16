/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useEffect, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import {
  FlatList, SafeAreaView, Text, TouchableOpacity, View
} from 'react-native'

import { AppContext } from '../../../App'
import colors from '../../const/colors'

const DrawerContent = ({ data }) => {
  const { selectedParentId, setSelectedParentId } = useContext(AppContext)

  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ width: '100%' }}>
      <FlatList
        data={data?.data.categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => { setSelectedParentId(item.id), navigation.navigate('Home') }}
            style={[{
              height: 50, borderWidth: 0.5, justifyContent: 'center', borderColor: colors.border
            }, { backgroundColor: selectedParentId === item.id ? colors.primary : null }]}>
            <Text style={{ marginLeft: 20, fontSize: 16, color: selectedParentId === item.id ? colors.white : null }}>{item.categoryName}</Text>
          </TouchableOpacity>) } />
    </SafeAreaView>
  )
}

export default DrawerContent
