import Landing from '@/pages/Landing';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import qs from 'qs';

export default function TelegramLanding() {
  const [searchParams] = useSearchParams();
  console.log('searchParams', searchParams)

	const location = useLocation();
  console.log('location', location)
  const gmail = qs.parse(location.search)
  console.log('gmail', gmail);
  console.log(qs.parse(gmail["?tgWebAppData"] as string))

  const params = useParams()

  return <Landing />
}