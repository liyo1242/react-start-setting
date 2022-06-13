import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
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
    baseUrl: 'https://opendata.cwb.gov.tw',
  }),
  endpoints: (builder) => ({
    getYunlinWeather: builder.query<OpendataModel, OpendataWeatherParams>({
      query: () => `/v1/rest/datastore/F-D0047-025`,
    }),
  }),
})