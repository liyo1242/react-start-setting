/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { AxiosRequestConfigExtends, RequestOptions, BackendPackageResult } from './types'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  urlPrefix?: string
  axiosInterceptors?: AxiosInterceptors
  requestOptions?: RequestOptions
}

export abstract class AxiosInterceptors {
  /**
   * @description: Process configuration before request
   */
  beforeRequestHook?: (
    config: AxiosRequestConfigExtends,
    options: RequestOptions
  ) => AxiosRequestConfig

  /**
   * @description: Request successfully processed
   */
  afterRequestHook?: {
    <T>(res: AxiosResponse<BackendPackageResult<T>>, options: RequestOptions): T
    <T>(res: AxiosResponse<T>, options: RequestOptions): T
  }

  /**
   * @description: Request Failure Handling
   */
  requestCatchHook?: (e: Error) => Promise<any>

  /**
   * @description: Interceptor before request
   */
  requestInterceptors?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  /**
   * @description: Interceptor after request
   */
  responseInterceptors?: <T>(res: AxiosResponse<T>) => AxiosResponse<T>

  /**
   * @description: Interceptor error handling before request
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: Interceptor error handling after request
   */
  responseInterceptorsCatch?: (error: Error) => void
}
