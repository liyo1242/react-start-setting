interface OpendataApiParams {
  Authorization: string
  format?: 'JSON' | 'XML'
}

interface OpendataApiListParams extends OpendataApiParams {
  limit?: number
  offset?: number
}

export interface OpendataWeatherParams extends OpendataApiListParams {
  locationName?: Array<string>
  elementName?: Array<
    'PoP12h' | 'Wx' | 'AT' | 'T' | 'RH' | 'CI' | 'WeatherDescription' | 'PoP6h' | 'WS' | 'WD' | 'Td'
  >
  sort?: string
  startTime?: string[]
  dataTime?: string[]
  timeFrom?: string
  timeTo?: string
}
