import Button from '@/components/Button';
import ArrowIcon from '@/assets/images/svg/common/buttonArrowDiagonal.svg';

import NFTExampleOne from '@/assets/images/png/landing/discoverSequenceOne.png';
import NFTExampleTwo from '@/assets/images/png/landing/discoverSequenceTwo.png';
import NFTExampleThree from '@/assets/images/png/landing/discoverSequenceThree.png';
import PresentationSection from '@/pages/Landing/PresentationSection';
import styles from '@/pages/Landing/styles.module.scss';

function LandingPage() {
	return (
		<div className={styles.landingContainer}>
			<PresentationSection />
		</div>
	);
}

export default LandingPage;
