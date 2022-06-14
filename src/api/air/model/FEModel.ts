interface EpaApiParams {
  api_key?: string
}

export interface EpaApiListParams extends EpaApiParams {
  limit?: number
  offset?: number
}
