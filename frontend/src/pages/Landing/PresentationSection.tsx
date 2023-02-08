import { useCallback } from 'react';

import Button from '@/components/Button';
import NFTExampleOne from '@/assets/images/png/landing/discoverSequenceOne.png';
import NFTExampleTwo from '@/assets/images/png/landing/discoverSequenceTwo.png';
import NFTExampleThree from '@/assets/images/png/landing/discoverSequenceThree.png';
import DiscoverNFT from '@/assets/images/svg/common/discoverNft.svg';
import { ButtonKinds } from '@/components/Button/interfaces';

import styles from '@/pages/Landing/styles.module.scss';
import { navigate } from '@/helpers/navigation';

function PresentationSection() {
	const goToCreateCollectionPage = useCallback(() => navigate('create-collection'), []);

	return (
		<section className={styles.landingPresentationSection}>
			<div className={styles.landingPresentationSlogan}>
				<div>Bring</div>
				<div>visions</div>
				<div>to life</div>
			</div>
			<div className={styles.landingPresentationDetails}>
				<div className={styles.landingPresentationExamples}>
					<div className={styles.landingPresentationExampleWrapper}>
						<img className={styles.landingPresentationExample} src={NFTExampleOne} />
					</div>
					<div className={styles.landingPresentationExampleWrapper}>
						<img className={styles.landingPresentationExample} src={NFTExampleTwo} />
					</div>
					<div className={styles.landingPresentationExampleWrapper}>
						<img className={styles.landingPresentationExample} src={NFTExampleThree} />
					</div>
					<div className={styles.landingPresentationExampleWrapper}>
						<img src={DiscoverNFT} />
					</div>
				</div>
				<div className={styles.landingPresentationExplanation}>
					<div className={styles.landingPresentationExplanationSection}>
						Bring your visions to life with ease!
					</div>
					<div className={styles.landingPresentationExplanationSection}>
						Create captivating NFT projects that can be scaled up from a single token to a whole
						collection.
					</div>
					<div className={styles.landingPresentationExplanationSection}>
						Whether you are just starting out or have been in the game for a while, it's never been
						easier to build something remarkable.
					</div>
				</div>
				<Button kind={ButtonKinds.basicWithIconArrowRight} onClick={goToCreateCollectionPage} green>
					Create new collection
				</Button>
			</div>
		</section>
	);
}

export default PresentationSection;
