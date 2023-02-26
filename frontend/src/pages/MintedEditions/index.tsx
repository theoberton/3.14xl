import { EditionCard } from '@/components';
import { Button, ButtonKinds } from '@/components/Button';

import { exampleData } from '@/helpers';

import styles from './styles.module.scss';

export default function MintedEditionsPage() {
	return (
		<div className={styles.mintedEditionsContainer}>
			<div className={styles.mintedEditionsHeader}>
				<h1>Minted editions</h1>

				<div>
					<Button componentType="link" kind={ButtonKinds.basic} to="/explore">
						Explore
					</Button>
					<Button componentType="link" kind={ButtonKinds.basic} to="/create-edition">
						Create new edition
					</Button>
				</div>
			</div>
			<div className={styles.mintedEditionsShowCase}>
				{exampleData &&
					exampleData.map(edition => (
						<EditionCard edition={edition} key={edition.name + edition.minter} />
					))}
			</div>
		</div>
	);
}
