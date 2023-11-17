/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {
  useContext, useEffect, useRef, useState
} from 'react'

import {
  ActivityIndicator,
  Alert,
  StyleSheet, Text, View
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import CategoryItem from './CategoryItem'
import ProductListItem from './ProductListItem'
import SubCategoryItem from './SubCategoryItem'
import { AppContext } from '../../../../App'
import colors from '../../../const/colors'
import queries, { type subCategoryInterface, type productsInterface } from '../../../const/queries'
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
  const [ isLoading, setIsLoading ] = useState(false)

  const getProducts = async (productIndex: number, pageNum: number) => {
    try {
      const productsData = await queries.getProducts(productIndex, pageNum)

      if (productsData && productsData?.data?.[0]) {
        setProducts(prevData => ({
          data: [ ...(prevData?.data ?? []), ...(productsData?.data || []) ]
            .map(item => ({ ...item, key: item.id.toString() }))
        }))

        setPageNum(pageNum + 1)
      }
    } catch (e) {
      Alert.alert('hata')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setPageNum(1)
    setProducts(undefined)
    productRef?.current?.scrollToOffset?.({ offset: 0, animated: true })
    if (selectedSubCategoryIndex != null) {
      void getProducts(selectedSubCategoryIndex, 1)
    }
  }, [ selectedSubCategoryIndex ])

  return (
    <View style={styles.container}>
      <View >
        <FlatList style={styles.categoryContainer}
          showsHorizontalScrollIndicator={false}
          horizontal data={data?.data.categories}
          renderItem={({ item }) => <CategoryItem item={item} />}
        />
        <FlatList
          style={styles.subCategoryContainer}
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
          <Text style={styles.headerText}>{subCategories?.data.categories.find((item) => item.id === selectedSubCategoryIndex)?.categoryName}</Text>
          {products?.data[0] && <FlatList
            ListFooterComponent={isLoading && ActivityIndicator}
            onEndReached={() => { void getProducts(selectedSubCategoryIndex, pageNum), setIsLoading(true) }}
            ref={productRef} ItemSeparatorComponent={() =>
              <View style={{ height: 10 }}/>} style={{ marginHorizontal: 10 }} data={products?.data}
            columnWrapperStyle={{ justifyContent: 'space-between' }} numColumns={3}
            renderItem={({ item }) => (
              <ProductListItem item={item}/>
            )}
          />
          }
          {!products?.data[0] && <ActivityIndicator color={colors.primary} size={100} />}

        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: { fontSize: 25, color: colors.primary, margin: 10 },
  subCategoryContainer: { marginTop: 20, marginHorizontal: 10 },
  categoryContainer: { marginTop: 20 },
  container: { flex: 1, backgroundColor: 'white' }
})

export default Home
