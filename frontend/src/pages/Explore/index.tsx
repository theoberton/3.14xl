import EditionsHeader from './Header';
import styles from './styles.module.scss';

import { exampleData } from './data';
import EditionItem from './EditionItem';

export function ExplorePage() {
	return (
		<div className={styles.editionsContainer}>
			<EditionsHeader />
			<div className={styles.editionsShowCase}>
				{exampleData &&
					exampleData.map(edition => <EditionItem edition={edition} key={edition.name} />)}
			</div>
		</div>
	);
}
