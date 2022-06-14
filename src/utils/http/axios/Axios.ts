import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import type {
  AxiosRequestConfigExtends,
  RequestOptions,
  BackendPackageResult,
  UploadFileParams,
} from 'utils/http/axios/types'
import type { CreateAxiosOptions } from 'utils/http/axios/axiosTransform'

import axios from 'axios'
import qs from 'qs'
import { isFunction } from 'utils/is'

import { RequestEnum, ContentTypeEnum } from 'enums/httpEnum'
/**
 * @description axios module
 */
export class WrapAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  private getInterceptors() {
    const { axiosInterceptors } = this.options
    return axiosInterceptors
  }

  /**
   * @description: Get WrapAxios Instance
   */
  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * @description: Set general header, but rarely used
   */
  setHeader(headers: Record<string, string>): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   * @description: Use constructor option to create api middleware
   */
  private setupInterceptors() {
    const interceptors = this.getInterceptors()
    if (!interceptors) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = interceptors

    // Request interceptor processing
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfigExtends) => {
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, config.requestOptions || {})
      }
      return config
    }, undefined)

    // Request interceptor error capture
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // Response result interceptor processing
    responseInterceptors &&
      isFunction(responseInterceptors) &&
      this.axiosInstance.interceptors.response.use(responseInterceptors, undefined)

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  // * Both PUT and POST may have the need to upload files
  uploadFile<T>(config: AxiosRequestConfigExtends, params: UploadFileParams) {
    const formData = new window.FormData()
    const { beforeRequestHook } = this.getInterceptors() || {}
    const { requestOptions } = this.options
    if (requestOptions && beforeRequestHook && isFunction(beforeRequestHook)) {
      config = beforeRequestHook(config, requestOptions)
    }

    if (params.data) {
      Object.entries(params.data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, value)
      })
    }

    formData.append(params.name || 'file', params.file, params.filename)

    return this.axiosInstance.request<T>({
      ...config,
      method: config.method || 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
      },
    })
  }

  // support form-data
  private supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    }
  }

  get<T>(config: AxiosRequestConfigExtends, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T>(config: AxiosRequestConfigExtends, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T>(config: AxiosRequestConfigExtends, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T>(config: AxiosRequestConfigExtends, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
  /**
   * TODO fix: Refactor this function to reduce its Cognitive Complexity from 16 to the 15 allowed. [+9 locations]sonarlint
   */
  private request<T>(config: AxiosRequestConfigExtends, options?: RequestOptions): Promise<T> {
    const transform = this.getInterceptors()

    const { requestOptions } = this.options

    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    config.requestOptions = opt

    const { beforeRequestHook, requestCatchHook, afterRequestHook } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      config = beforeRequestHook(config, opt)
    }

    config = this.supportFormData(config)

    // *
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<T, AxiosResponse<BackendPackageResult<T>>>(config)
        .then((res: AxiosResponse<BackendPackageResult<T>>) => {
          if (afterRequestHook && isFunction(afterRequestHook)) {
            try {
              const ret = afterRequestHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as any)
        })
        .catch((e: Error) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e))
            return
          }
          reject(e)
        })
    })
  }
}
