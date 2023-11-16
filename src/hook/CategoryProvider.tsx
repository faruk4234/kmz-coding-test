import { createContext } from 'react'

import { type categoriesInterface } from '../const/queries'

export interface categoriesContextInterface {
  data: categoriesInterface | null | undefined
  setData: any
}

const CategoryProvider = createContext<categoriesContextInterface>({
  data: undefined,
  setData: undefined
})

export default CategoryProvider
