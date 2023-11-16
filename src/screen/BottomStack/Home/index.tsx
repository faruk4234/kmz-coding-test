/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {
  useContext, useEffect, useRef, useState
} from 'react'

import { useRoute } from '@react-navigation/native'
import {
  Alert,
  Image, ImageBackground, Text, TouchableOpacity, View, useWindowDimensions
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import CategoryItem from './CategoryItem'
import ProductListItem from './ProductListItem'
import SubCategoryItem from './SubCategoryItem'
import { AppContext } from '../../../../App'
import colors from '../../../const/colors'
import queries, { type subCategoryInterface, type categoriesInterface, type productsInterface } from '../../../const/queries'
import CategoryProvider from '../../../hook/CategoryProvider'

const Home = () => {
  const { data } = useContext(CategoryProvider)

  const { selectedParentId, setSelectedParentId } = useContext(AppContext)
  const [ subCategories, setSubCategories ] = useState<subCategoryInterface>()
  const [ selectedSubCategoryIndex, setSelectedSubCategoryIndex ] = useState<number>()
  const [ products, setProducts ] = useState<productsInterface>()

  useEffect(() => {
    setSelectedParentId(data?.data.categories?.[0].id)
  }, [ data ])

  useEffect(() => {
    const getSubCategories = async () => {
      if (selectedParentId != null) {
        const subCategoryData = await queries.subCategories(selectedParentId)
        setProducts(undefined)
        setSubCategories(subCategoryData)
      }
    }
    void getSubCategories()
  }, [ selectedParentId ])

  useEffect(() => {
    if ((subCategories?.data.categories?.[0]) != null) {
      setSelectedSubCategoryIndex(subCategories?.data.categories?.[0].id)
    }
  }, [ subCategories ])

  const productRef = useRef<FlatList>(null)
  const [ pageNum, setPageNum ] = useState<number>(1)

  const getProducts = async (productIndex: number, pageNum: number) => {
    const productsData = await queries.getProducts(productIndex, pageNum)

    if (productsData && productsData?.data?.[0]) {
      setProducts(prevData => ({
        data: [ ...(prevData?.data ?? []), ...(productsData?.data || []) ]
          .map(item => ({ ...item, key: item.id.toString() }))
      }))

      setPageNum(pageNum + 1)
    }
  }
  useEffect(() => {
    setPageNum(1)
    productRef?.current?.scrollToOffset?.({ offset: 0, animated: true })
    setProducts(undefined)
    if (selectedSubCategoryIndex != null) {
      void getProducts(selectedSubCategoryIndex, 1)
    }
  }, [ selectedSubCategoryIndex ])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View >
        <FlatList style={{ marginTop: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal data={data?.data.categories}
          renderItem={({ item }) => <CategoryItem item={item} />}
        />
        <FlatList
          style={{ marginTop: 20, marginHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          contentContainerStyle={{
          }}
          horizontal
          data={subCategories?.data.categories}
          renderItem={({ item }) =>
            <SubCategoryItem
              item={item}
              selectedIndex={selectedSubCategoryIndex}
              setSelectedSubCategoryIndex={setSelectedSubCategoryIndex}/>}
        />

      </View>
      {selectedSubCategoryIndex &&
        <>
          <Text style={{ fontSize: 25, color: colors.primary, margin: 10 }}>Ürünler</Text>
          <FlatList
            onEndReached={() => { void getProducts(selectedSubCategoryIndex, pageNum) }}
            ref={productRef} ItemSeparatorComponent={() =>
              <View style={{ height: 10 }}/>} style={{ marginHorizontal: 10 }} data={products?.data}
            columnWrapperStyle={{ justifyContent: 'space-between' }} numColumns={3}
            renderItem={({ item }) => (
              <ProductListItem item={item}/>
            )}
          />
        </>
      }
    </View>
  )
}

export default Home
