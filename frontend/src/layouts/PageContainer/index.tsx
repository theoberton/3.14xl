import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';

import styles from './styles.module.scss';

export default function PageContainer() {
	return (
		<div className={styles.pageContainer}>
			<Header />
			<main className={styles.pageContainerMain}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
