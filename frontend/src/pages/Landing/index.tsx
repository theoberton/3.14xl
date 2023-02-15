import { PresentationSection } from '@/pages/Landing/PresentationSection';
import { Header } from '@/components';
import CubeLeft from '@/assets/images/png/landing/CubeLeft.png';
import CubeRight from '@/assets/images/png/landing/CubeRight.png';
import styles from '@/pages/Landing/styles.module.scss';

export function LandingPage() {
	return (
		<div className={styles.landingContainer}>
			<img src={CubeLeft} className={styles.landingCubeLeft} />
			<img src={CubeRight} className={styles.landingCubeRight} />
			<Header transparent />
			<PresentationSection />
		</div>
	);
}
