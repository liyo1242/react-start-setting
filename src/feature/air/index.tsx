import { useGetYunlinAirQuery } from 'api/air'

export default function AirComponent() {
  const { data, isLoading } = useGetYunlinAirQuery({
    api_key: process.env.REACT_APP_EPA_KEY,
    limit: 10,
  })

  return <div>{isLoading ? 'air component isLoading' : data?.resource_id}</div>
}
