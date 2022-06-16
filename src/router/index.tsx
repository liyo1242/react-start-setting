import type { WrapRouteObject } from './type'
import { BrowserRouter, Routes, useRoutes } from 'react-router-dom'

import * as dynamicRouteObject from './route'

const dynamicRoute: Array<WrapRouteObject> = [...dynamicRouteObject.air]
const staticRoute: Array<WrapRouteObject> = []

const Router = () => {
  const dynamicRouteComponent = useRoutes(dynamicRoute)
  const staticRouteComponent = useRoutes(staticRoute)

  return (
    <BrowserRouter>
      <Routes>
        {dynamicRouteComponent}
        {staticRouteComponent}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
