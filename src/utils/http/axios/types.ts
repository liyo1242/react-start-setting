import { AxiosRequestConfig } from 'axios'

export interface RequestOptions {
  isParamsSerializer?: boolean
  // * option data
  apiUrl?: string
  urlPrefix?: string
  apiVersion?: string
  // * option action
  joinTime?: boolean
  joinPrefix?: boolean
  noToken?: boolean
}

export interface AxiosRequestConfigExtends extends AxiosRequestConfig {
  requestOptions?: RequestOptions
  restfulParam?: Record<string, string | number>
}

// * It is closely related to your back-end return packaging interface
export interface BackendPackageResult<T> {
  Status: number
  ErrorMessage: string | null
  Data: T
}

export interface ErrorData<T = any> {
  ErrorMessage: T
  Status: number
}

export interface UploadFileParams {
  data?: Record<any, any>
  name?: string
  file: File | Blob
  filename?: string
  [key: string]: any
}
