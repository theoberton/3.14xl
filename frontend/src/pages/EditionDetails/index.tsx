import EditionDetails from './Details';
import EditionPreview from './Preview';
import styles from './styles.module.scss';

export function EditionDetailsPage() {
	return (
		<div className={styles.editionDetailsContainer}>
			<EditionPreview />
			<EditionDetails />
		</div>
	);
}
