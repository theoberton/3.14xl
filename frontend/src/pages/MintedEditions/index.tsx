import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditionCard } from '@/components';
import { Button, ButtonKinds } from '@/components/Button';

import { exampleData } from './data';

import styles from './styles.module.scss';

export default function MintedEditionsPage() {
	const navigate = useNavigate();
	const goToMintedEditionsPage = useCallback(() => navigate('/explore'), []);
	const goToCreateEditionPage = useCallback(() => navigate('/create-edition'), []);

	return (
		<div className={styles.mintedEditionsContainer}>
			<div className={styles.mintedEditionsHeader}>
				<h1>Minted editions</h1>

				<div>
					<Button kind={ButtonKinds.basic} onClick={goToMintedEditionsPage}>
						Explore
					</Button>
					<Button kind={ButtonKinds.basic} onClick={goToCreateEditionPage}>
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
