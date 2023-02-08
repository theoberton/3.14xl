import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

export function PageContainer() {
	return (
		<div className={styles.pageContainer}>
			<Outlet />
		</div>
	);
}
