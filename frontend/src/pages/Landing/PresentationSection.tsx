import { Button, ButtonKinds } from '@/components/Button';
import styles from '@/pages/Landing/styles.module.scss';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';
import Background from './Background';

export function PresentationSection() {
	const [tonConnectUI] = useTonConnectUI();
	const tonAddress = useTonAddress();
	const navigate = useNavigate();

	return (
		<section className={styles.landingPresentationSection}>
			<Background />

			<div className={styles.landingPresentationSlogan}>
				<span className={styles.landingPresentationSloganItem}>Bring</span>
				<span className={styles.landingPresentationSloganItem}>visions</span>
				<span className={styles.landingPresentationSloganItem}>to life</span>
			</div>

			<p className={styles.landingPresentationExplanation}>
				Whether you are just starting out or have been in the game for a while, it's never been
				easier to build something remarkable
			</p>

			<div className={styles.landingPresentationLinks}>
				<Button
					componentType="button"
					kind={ButtonKinds.basic}
					onClick={async () => {
						if (!tonAddress) {
							await tonConnectUI.connectWallet();
						}
						navigate('/create-edition');
					}}
				>
					Create new edition
				</Button>
			</div>
		</section>
	);
}
