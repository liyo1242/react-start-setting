import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AirResuleModel } from './model/BEModel'
import { EpaApiListParams } from './model/FEModel'

export const airApi = createApi({
  reducerPath: 'airApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://data.epa.gov.tw',
  }),
  endpoints: (builder) => ({
    getYunlinAir: builder.query<AirResuleModel, EpaApiListParams>({
      query: (params) => ({
        url: `/api/v2/aqx_p_229`,
        method: 'GET',
        params,
      }),
    }),
  }),
})

export const { useGetYunlinAirQuery } = airApi
