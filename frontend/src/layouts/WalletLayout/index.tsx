import { Outlet } from 'react-router-dom';
import { Header } from '@/components';
import styles from '@/layouts/WalletLayout/styles.module.scss';

export function WalletLayout() {
	return (
		<div className={styles.container}>
			<Header />
			<Outlet />
		</div>
	);
}
