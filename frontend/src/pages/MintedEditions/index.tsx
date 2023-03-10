import { EditionCard } from '@/components';
import { Button, ButtonKinds } from '@/components/Button';
import { Helmet } from 'react-helmet-async';

import styles from './styles.module.scss';

export default function MintedEditionsPage() {
	return (
		<div className={styles.mintedEditionsContainer}>
			<Helmet title="3.14XL - Minted editions" />
			<div className={styles.mintedEditionsHeader}>
				<h1>Minted editions</h1>
				<div className={styles.mintedEditionsHeaderButtons}>
					<Button componentType="link" kind={ButtonKinds.basic} to="/explore">
						Explore
					</Button>
					<Button componentType="link" kind={ButtonKinds.basic} to="/create-edition">
						Create new edition
					</Button>
				</div>
			</div>
			<div className={styles.mintedEditionsShowCase}>
				{/* {exampleData &&
					exampleData.map(edition => (
						<EditionCard edition={edition} key={edition.name + edition.owner} />
					))} */}
			</div>
		</div>
	);
}
