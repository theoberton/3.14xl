import NProgress from 'nprogress';
import { useEffect } from 'react';

import styles from './styles.module.scss';

export const LazyLoad = () => {
	useEffect(() => {
		NProgress.configure({
			showSpinner: false,
			trickleSpeed: 50,
		});

		NProgress.start();

		return () => {
			NProgress.done();
		};
	});

	return <div className={styles.lazyLoad} />;
};
