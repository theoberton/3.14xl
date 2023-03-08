
import Landing from '@/pages/Landing';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import qs from 'qs';

export default function TelegramLanding() {
  let [searchParams, setSearchParams] = useSearchParams();
  console.log('searchParams', searchParams)

	const location = useLocation();
  console.log('location', location)
  const gmail = qs.parse(location.search)
  console.log('gmail', gmail);
  // @ts-ignore
  console.log(qs.parse(gmail["?tgWebAppData"]))

  const params = useParams()
  console.log('params', params)

  return <Landing />
}