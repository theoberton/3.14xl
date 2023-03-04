import { Helmet } from 'react-helmet-async';

import { Button, ButtonKinds } from '@/components';
import pageContainerStyles from '@/layouts/PageContainer/styles.module.scss';
import styles from '@/pages/NotFound/styles.module.scss';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Background = () => {
	const array = new Array(10).fill(undefined);

	return (
		<ul className={styles.notFoundBackground}>
			{array.map((item, index) => (
				<li key={index}></li>
			))}
		</ul>
	);
};

export default function SomethingWentWrong() {
	const navigate = useNavigate();

	const redirectToMainPage = useCallback(() => {
		navigate('/');
		// @ts-ignore
		window.navigation.reload();
	}, []);

	return (
		<div className={pageContainerStyles.pageContainer}>
			<Helmet title="3.14XL - Something went wrong" />
			<div className={styles.notFoundContainer}>
				<Background />
				<h1>Something went wrong 😔</h1>
				<p>There's an issue and the page could not be loaded.</p>
				<Button componentType="button" onClick={redirectToMainPage} kind={ButtonKinds.basic}>
					Go to the main page
				</Button>
			</div>
		</div>
	);
}
