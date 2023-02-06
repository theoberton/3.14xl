import PresentationSection from '@/pages/Landing/PresentationSection'
import styles from '@/pages/Landing/styles.module.scss';


function LandingPage() {
	return (
	<div>
		<div className={styles.landingContainer}>
			<PresentationSection />
		</div>
	</div>
	);
}

export default LandingPage;
