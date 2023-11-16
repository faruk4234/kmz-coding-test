import React from 'react'

import {
  Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions
} from 'react-native'

import colors from '../../../const/colors'

export interface subCategoryInterface {
  item: {
    id: number
    imagePath: {
      imagePath: string
    }
    categoryName: string
  }
  setSelectedSubCategoryIndex?: any
  selectedIndex?: number
}

const SubCategoryItem: React.FC<subCategoryInterface> = ({ item, setSelectedSubCategoryIndex, selectedIndex }) => {
  const { width } = useWindowDimensions()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => { setSelectedSubCategoryIndex(item.id) }}
      style={styles.container}
    >
      <Image
        source={{ uri: item.imagePath.imagePath }}
        style={{
          width: width * 0.20, aspectRatio: 1, borderRadius: 8, margin: 5
        }}
      />
      <View style={styles.nameText}>
        <Text style={{ maxWidth: width * 0.23, fontSize: 10, color: selectedIndex === item.id ? colors.primary : colors.lightBlack }}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary
  },
  nameText: {
    height: 40,
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary
  }
})

export default SubCategoryItem
