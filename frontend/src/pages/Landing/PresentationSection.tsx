import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ButtonKinds } from '@/components/Button';

import styles from '@/pages/Landing/styles.module.scss';

export function PresentationSection() {
	const navigate = useNavigate();
	const goToCreateCollectionPage = useCallback(() => navigate('/create-edition'), []);
	const goToExplorePage = useCallback(() => navigate('/explore'), []);

	return (
		<section className={styles.landingPresentationSection}>
			<div className={styles.landingPresentationSlogan}>
				<span className={styles.landingPresentationSloganItem}>Bring</span>
				<span className={styles.landingPresentationSloganItem}>visions</span>
				<span className={styles.landingPresentationSloganItem}>to life</span>
			</div>
			<div className={styles.landingPresentationDetails}>
				<div className={styles.landingPresentationExplanation}>
					<div className={styles.landingPresentationExplanationSection}>
						Whether you are just starting out or have been in the game for a while, it's never been
						easier to build something remarkable.
					</div>
				</div>
				<div>
					<Button kind={ButtonKinds.basic} onClick={goToCreateCollectionPage}>
						Create new collection
					</Button>
					<Button kind={ButtonKinds.basic} onClick={goToExplorePage}>
						Explore
					</Button>
				</div>
			</div>
		</section>
	);
}
