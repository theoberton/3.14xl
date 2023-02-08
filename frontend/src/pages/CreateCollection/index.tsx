import { useCallback } from 'react';
import { navigate } from '@/helpers';
import { Button, ButtonKinds } from '@/components';
import CollectionMenu from './CollectionMenu';
import styles from './styles.module.scss';

export function CreateCollection() {
	const goToLandingPage = useCallback(() => navigate('/'), []);

	return (
		<div className={styles.collection}>
			<div className={styles.collectionLeftSide}>
				<div className={styles.collectionLeftSideNavigation}>
					<Button kind={ButtonKinds.arrowLeft} onClick={goToLandingPage} />
				</div>
				<div className={styles.collectionLeftSideContent}>
					<CollectionMenu />
				</div>
			</div>
			<div className={styles.collectionRightSide}>
				<div className={styles.collectionRightSideContent}>
					<div>Create</div>
					<div>a great</div>
					<div>project</div>
				</div>
			</div>
		</div>
	);
}
