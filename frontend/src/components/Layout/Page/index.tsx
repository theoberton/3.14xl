import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';

import styles from './styles.module.scss';

export function Page({ footer = false }: { footer?: boolean }) {
	return (
		<div className={styles.pageContainer}>
			<Header />
			<Outlet />
			{footer && <Footer />}
		</div>
	);
}
