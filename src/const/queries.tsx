/* eslint-disable @typescript-eslint/explicit-function-return-type */

import instance from './axios'

interface loginInterface {
  username: string
  password: string
}

interface loginResponseToken {
  data: {
    token: string
    refreshToken: string
  }
}

const login = async ({ username, password }: loginInterface) =>
  (await instance.post<loginResponseToken>('/api/v5/sf/auth/login', { username, password }) as unknown as loginResponseToken)

export interface categoriesInterface {
  data: {
    categories: Array<{
      id: number
      categoryName: string
      order: number
      link: string
      hasImage: number
      parentId: number
      subCategoryCount: number
      productCount: number
    }>
  }
}

const categories = async () => await instance.get<categoriesInterface>('/api/v5/ad/product/categories') as unknown as categoriesInterface

export interface subCategoryInterface {
  data: {
    selectedCategoryId: number
    categories: Array<{
      id: number
      categoryName: string
      order: number
      link: string
      imagePath: {
        id: number
        imagePath: string
      }
      hasImage: number
      parentId: number
      subCategoryCount: number
      productCount: number
    }>
  }
}

const subCategories = async (parentId: number) => await instance.get<subCategoryInterface>(`/api/v5/ad/product/categories?parentId=${parentId}`) as unknown as subCategoryInterface

export interface productItemInterface {
  amount: number
  key: number
  id: number
  stockName: string
  stockCode: number
  stock: number
  price: number
  priceVat: string
  stockType: string
  currency: string
  totalRow: number
  kdv: number
  listPrice: number
  listPriceVat: string
  count?: number
  productImages: Array<{
    id: number
    imagePath: string
  }>

}

export interface productsInterface {
  map: (arg0: (item: { id: { toString: () => any } }) => { key: any, id: { toString: () => any } }) => Array<{
    key: number
    id: number
    stockName: string
    stockCode: number
    stock: number
    price: number
    priceVat: string
    stockType: string
    currency: string
    totalRow: number
    kdv: number
    listPrice: number
    listPriceVat: string
    productImages: Array<{
      id: number
      imagePath: string
    }>
  }>
  data: productItemInterface[]
}

const getProducts = async (productId: number, pageNumber: number) => await instance.get<productsInterface>(`/api/v5/sf/product/category_products?Id=${productId}&PageNumber=${pageNumber}&PageSize=21`) as unknown as productsInterface

const addCart = async (productId: number, amount: number) => await instance.post('/api/v5/sf/cart/cart', { productId, amount })

export default {
  login,
  categories,
  subCategories,
  getProducts,
  addCart
}
