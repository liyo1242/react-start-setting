export interface OpendataModel {
  success: string
  result: OpendataResultModel
  records: OpendataRecordsModel
}

interface OpendataResultModel {
  resource_id: string
  fields: Array<{ id: string; type: string }>
}

interface OpendataRecordsModel {
  locations: {
    datasetDescription: string
    locationsName: string
    dataid: string
    location: Array<OpendataRecordLocationModel>
  }[]
}

interface OpendataRecordLocationModel {
  locationName: string
  geocode: string
  lat: string
  lon: string
  weatherElement: {
    description: string
    elementName:
      | 'PoP12h'
      | 'Wx'
      | 'AT'
      | 'T'
      | 'RH'
      | 'CI'
      | 'WeatherDescription'
      | 'PoP6h'
      | 'WS'
      | 'WD'
      | 'Td'
    time: {
      startTime: string
      endTime: string
      elementValue: {
        value: string
        measures: string
      }[]
    }[]
  }[]
}
