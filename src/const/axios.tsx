import axios from 'axios'
//  import { t } from 'i18next'

import Storage from './storage'

const instance = axios.create({
  baseURL: 'https://apiv5.akilliticaretim.com/',
  timeout: 15 * 1000
})

instance.interceptors.request.use(async (request) => {
  const accessToken: string = await Storage.getItem('accessToken')
  console.log(accessToken)

  if (accessToken.length > 0) {
    request.headers.authorization = `Bearer ${accessToken}`
  }

  request.headers.Accept = 'application/json'
  request.headers.Accept = 'image/png'
  request.headers.GUID = '24BE-DB0E-D75E-4060'
  request.headers['Content-Type'] = 'application/json'

  return request
})

instance.interceptors.response.use((response) => {
  return response.data
}, async (error) => {
  return await Promise.reject(error)
})

export default instance
