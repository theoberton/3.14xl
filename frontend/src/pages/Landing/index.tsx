import { PresentationSection } from '@/pages/Landing/PresentationSection';
import ShowcaseSection from './ShowcaseSection';
import { Helmet } from 'react-helmet-async';

import styles from '@/pages/Landing/styles.module.scss';
import { useEffect } from 'react';
import { useTelegram } from '@/hooks';

export default function LandingPage() {

	const telegram = useTelegram();
	console.log('telegram', telegram)

	useEffect(() => {
		try {
			console.log('Helllloooooo');
			telegram.sendData('This is data for you');
			console.log('Helllloooooo');

			console.log('telegram.user', telegram.user);
		} catch(err) {
			console.log('err', err)
		}

	}, [])

	return (
		<>
			<Helmet title="3.14XL - Bring visions to life" />
			<div className={styles.landingContainer}>
				<PresentationSection />
			</div>
			<ShowcaseSection />
		</>
	);
}
