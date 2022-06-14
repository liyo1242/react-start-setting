interface EpaResultModel {
  fields: Array<{ id: string; type: string; info: { label: string } }>
  resource_id: string
}

export interface AirResuleModel extends EpaResultModel {
  records: Array<ResuleModel>
}

interface ResuleModel {
  siteid: string
  sitename: string
  county: string
  itemid: string
  itemname: string
  itemengname: string
  itemunit: string
  monitordate: string
  concentration: string
}
