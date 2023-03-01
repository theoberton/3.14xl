import { PresentationSection } from '@/pages/Landing/PresentationSection';
import ShowcaseSection from './ShowcaseSection';
import { Helmet } from 'react-helmet-async';

import styles from '@/pages/Landing/styles.module.scss';

export default function LandingPage() {
	return (
		<>
			<Helmet title="3.14XL" />
			<div className={styles.landingContainer}>
				<PresentationSection />
			</div>
			<ShowcaseSection />
		</>
	);
}
