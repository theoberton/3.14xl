import EditionsHeader from './Header';
import { EditionCard } from '@/components';
import styles from './styles.module.scss';

import { exampleData } from './data';

export default function ExplorePage() {
	return (
		<div className={styles.editionsContainer}>
			<EditionsHeader />
			<div className={styles.editionsShowCase}>
				{exampleData &&
					exampleData.map(edition => (
						<EditionCard edition={edition} key={edition.name + edition.minter} />
					))}
			</div>
		</div>
	);
}
