import type { AxiosResponse } from 'axios'
import type { AxiosInterceptors, CreateAxiosOptions } from 'utils/http/axios/axiosTransform'

import { ContentTypeEnum } from 'enums/httpEnum'
import { deepMerge } from 'utils/index'

import { joinTimestamp } from 'utils/http/axios/helper'
import { WrapAxios } from 'utils/http/axios/Axios'

const axiosInterceptors: AxiosInterceptors = {
  /**
   * For Response, there are many types to handling, some APIs will repackage the output with their own models,
   * Like handling 6-digit error codes in output
   *
   * So you need to make sure, Is it necessary to add BackendPackageResult on your response type
   * ex: res: AxiosResponse<BackendPackageResult<T>>
   * or AxiosResponse<T>
   */
  afterRequestHook: <T>(res: AxiosResponse<T>) => {
    const { data, status } = res
    if (!data) throw new Error('sys.api.apiRequestFailed')
    if (status === 200) {
      return data
    }
    throw new Error('sys.api.apiStatusFailed')
  },

  beforeRequestHook: (config, options) => {
    const { apiUrl, apiVersion, urlPrefix, joinTime = true, joinPrefix } = options

    // * handling api fetch url
    if (apiVersion) {
      config.url = `${apiVersion}${config.url}`
    }

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl) {
      config.url = `${apiUrl}${config.url}`
    }

    // * restful API params handle
    if (config.restfulParam) {
      Object.entries(config.restfulParam).forEach(([restfulKey, value]) => {
        config.url = config.url?.replace(`{${restfulKey}}`, value + '')
      })
    }

    config.params = Object.assign(config.params || {}, joinTimestamp(joinTime, false))

    return config
  },

  requestCatchHook: (error: any) => {
    return Promise.reject(error)
  },

  // * Start Handle Axios Interceptor
}

function createWrapAxios(opt?: Partial<CreateAxiosOptions>) {
  return new WrapAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        baseURL: 'https://data.epa.gov.tw',
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        axiosInterceptors,
        requestOptions: {
          urlPrefix: '/api',
          apiVersion: '/v2',
          joinPrefix: true,
          joinTime: true,
        },
      },
      opt || {}
    )
  )
}
export const epaHttp = createWrapAxios()
