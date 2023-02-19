import { useCallback } from 'react';

import { Button } from '@/components/Button';

import { ButtonKinds } from '@/components/Button/interfaces';

import styles from '@/pages/Landing/styles.module.scss';
import { navigate } from '@/helpers';

export function PresentationSection() {
	const goToCreateCollectionPage = useCallback(() => navigate('/create-edition'), []);

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
				<Button kind={ButtonKinds.basic} onClick={goToCreateCollectionPage}>
					Create new collection
				</Button>
			</div>
		</section>
	);
}
