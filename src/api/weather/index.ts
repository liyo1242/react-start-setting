import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OpendataModel } from './model/BEModel'
import { OpendataWeatherParams } from './model/FEModel'

// try to transfer to that type
// enum Api {
//   YunlinWeather = '/F-D0047-025'
// }

// const useYunlinWeather = (params: OpendataWeatherParams) => {
//   return WrapRTKQ.get<OpendataModel>({
//     url: Api.YunlinWeather,
//     params
//   })
// }

// const { data, error, isLoading } = useYunlinWeather()

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://data.epa.gov.tw',
  }),
  endpoints: (builder) => ({
    getYunlinWeather: builder.query<OpendataModel, OpendataWeatherParams>({
      query: (params) => ({
        url: `/api/v2/aqx_p_229`,
        method: 'GET',
        params,
      }),
    }),
  }),
})

export const { useGetYunlinWeatherQuery } = weatherApi
