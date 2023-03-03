import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
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
	const navigate = useNavigate();

	const [timeToRedirect, setTimeToRedirect] = useState(30);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeToRedirect(time => time - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timeToRedirect, setTimeToRedirect]);

	useEffect(() => {
		if (timeToRedirect === -1) {
			navigate('/');
		}
	}, [timeToRedirect]);

	return (
		<>
			<Helmet title="404 Not Found" />
			<div className={styles.notFoundContainer}>
				<Background />
				<h1>Page not found</h1>
				<p>
					You will be redirected to the main page in <span>{timeToRedirect}</span>
				</p>
				<Button componentType="link" to="/" kind={ButtonKinds.basic}>
					Main page
				</Button>
			</div>
		</>
	);
}
