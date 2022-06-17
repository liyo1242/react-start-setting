import type { WrapRouteObject } from './type'
import { useRoutes } from 'react-router-dom'

import * as dynamicRouteObject from './route'

const dynamicRoute: Array<WrapRouteObject> = [...dynamicRouteObject.air]
const staticRoute: Array<WrapRouteObject> = [
  {
    path: '/',
  },
]

const Router = () => {
  const dynamicRouteComponent = useRoutes(dynamicRoute)
  const staticRouteComponent = useRoutes(staticRoute)

  return (
    <>
      {dynamicRouteComponent}
      {staticRouteComponent}
    </>
  )
}

export default Router
