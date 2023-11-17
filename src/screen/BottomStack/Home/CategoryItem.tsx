import React, { useContext } from 'react'

import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import { AppContext } from '../../../../App'
import colors from '../../../const/colors'

export interface categoryItemInterface {
  item: {
    id?: number
    categoryName?: string
  }
}

const CategoryItem: React.FC<categoryItemInterface> = ({ item }) => {
  const { selectedParentId, setSelectedParentId } = useContext(AppContext)

  return (
    <TouchableOpacity
      onPress={() => { setSelectedParentId(item.id) }}
      style={[ styles.container, { backgroundColor: selectedParentId === item.id ? colors.primary : colors.white }]}>
      <Text
        style={{ marginHorizontal: 5, color: selectedParentId === item.id ? colors.white : colors.lightBlack }}>{item.categoryName}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.primary,
    height: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    backgroundColor: colors.white,

    borderRadius: 20

  }
})

export default CategoryItem
