import type { RouteObject } from 'react-router-dom'

export interface WrapRouteObject extends RouteObject {
  permission?: Array<string>
  isShowOnSideBar?: boolean
  icon?: string
  children?: Array<WrapRouteObject>
}
