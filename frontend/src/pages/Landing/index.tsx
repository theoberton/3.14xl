import { Helmet } from 'react-helmet-async';

import { PresentationSection } from '@/pages/Landing/PresentationSection';
import ShowcaseSection from './ShowcaseSection';
import Background from './Background';

import styles from '@/pages/Landing/styles.module.scss';

export default function LandingPage() {
	return (
		<>
			<Helmet title="3.14XL - Bring visions to life" />
			<Background />
			<div className={styles.landingContainer}>
				<PresentationSection />
			</div>
			<ShowcaseSection />
		</>
	);
}
