import { useTonConnect } from '@/hooks';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function PrivateRoute() {
	const location = useLocation();
	const { connected } = useTonConnect();

	const redirectionScreen = connected ? (
		<Navigate to="/not-found" state={{ from: location }} replace />
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);

	return connected ? <Outlet /> : redirectionScreen;
}
