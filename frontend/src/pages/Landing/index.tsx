import { PresentationSection } from '@/pages/Landing/PresentationSection';
import ShowcaseSection from './ShowcaseSection';

import styles from '@/pages/Landing/styles.module.scss';

export default function LandingPage() {
	return (
		<>
			<div className={styles.landingContainer}>
				<PresentationSection />
			</div>
			<ShowcaseSection />
		</>
	);
}
