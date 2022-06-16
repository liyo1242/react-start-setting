import type { WrapRouteObject } from 'router/type'
import Layout from 'layout'
import AirComponent from 'feature/air'

export default [
  {
    path: '/air',
    element: <Layout />,
    children: [
      {
        path: 'test',
        element: <AirComponent />,
      },
    ],
  },
] as Array<WrapRouteObject>
