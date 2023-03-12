import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';

import styles from './../PageContainer/styles.module.scss';

export default function PageContainerWithFooter() {
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
