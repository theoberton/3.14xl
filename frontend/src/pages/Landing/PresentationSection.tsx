import { Button, ButtonKinds } from '@/components/Button';

import styles from '@/pages/Landing/styles.module.scss';
import { useEffect, useState } from 'react';

export function PresentationSection() {
	const [isViewFeaturedButtonShown, setIsViewfeaturedButtonShown] = useState(true);

	const goToFeaturedCollections = () => {
		setIsViewfeaturedButtonShown(false);
		const element = document.getElementById('landingShowcase');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		window.onscroll = () => {
			if (window.pageYOffset === 0) {
				setIsViewfeaturedButtonShown(true);
			}

			if (window.pageYOffset > 30) {
				setIsViewfeaturedButtonShown(false);
			}
		};
	}, []);

	return (
		<section className={styles.landingPresentationSection}>
			<div className={styles.landingPresentationSlogan}>
				<span className={styles.landingPresentationSloganItem}>Bring</span>
				<span className={styles.landingPresentationSloganItem}>visions</span>
				<span className={styles.landingPresentationSloganItem}>to life</span>
			</div>

			<p className={styles.landingPresentationExplanation}>
				Whether you are just starting out or have been in the game for a while, it's never been
				easier to build something remarkable.
			</p>

			<div className={styles.landingPresentationLinks}>
				<Button componentType="link" kind={ButtonKinds.basic} to="/create-edition">
					Create new edition
				</Button>
				<Button componentType="link" kind={ButtonKinds.basic} to="/explore">
					Explore
				</Button>
			</div>
			{
				<Button
					isInvisible={!isViewFeaturedButtonShown}
					componentType="button"
					kind={ButtonKinds.arrowDown}
					basicInverted
					trembling
					onClick={goToFeaturedCollections}
				/>
			}
		</section>
	);
}
