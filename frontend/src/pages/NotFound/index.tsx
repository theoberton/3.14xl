import { Helmet } from 'react-helmet-async';

import { Button, ButtonKinds } from '@/components';

import styles from './styles.module.scss';

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

export default function NotFound() {
	return (
		<>
			<Helmet title="3.14XL - 404 Not Found" />
			<div className={styles.notFoundContainer}>
				<Background />
				<h1>Page not found</h1>
				<Button componentType="link" to="/" kind={ButtonKinds.basic}>
					Go to the main page
				</Button>
			</div>
		</>
	);
}
