import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

function PageContainer() {
	return (
		<div className={styles.pageContainer}>
			<Outlet />
		</div>
	);
}

export default PageContainer;
