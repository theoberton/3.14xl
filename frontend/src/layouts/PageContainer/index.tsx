import { Outlet } from 'react-router-dom';
import { Header } from '@/components';

import styles from './styles.module.scss';

export function PageContainer() {
	return (
		<div className={styles.pageContainer}>
			<Header />
			<Outlet />
		</div>
	);
}
