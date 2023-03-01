import EditionsHeader from './Header';
import { Helmet } from 'react-helmet-async';
import { EditionCard } from '@/components';
import styles from './styles.module.scss';

import { exampleData } from '@/helpers';

export default function ExplorePage() {
	return (
		<div className={styles.editionsContainer}>
			<Helmet title={'3.14XL - Explore collections'} />
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
