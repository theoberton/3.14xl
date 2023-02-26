import { EditionCard } from '@/components';
import { exampleData } from '@/helpers';

import styles from '@/pages/Landing/styles.module.scss';

function ShowcaseSection() {
	return (
		<section className={styles.ShowcaseSection}>
			{exampleData &&
				exampleData.map(edition => (
					<EditionCard edition={edition} key={edition.name + edition.minter} />
				))}
		</section>
	);
}

export default ShowcaseSection;
