import { Outlet } from 'react-router-dom';
import { Header } from '@/components';

export function WalletLayout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
