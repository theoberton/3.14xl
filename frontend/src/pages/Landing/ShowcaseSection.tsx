import { EditionCard } from '@/components';
import { IEditionItem } from '@/components/EditionCard/interface';
import { useTonClient } from '@/hooks';
import { getManagerContracts } from '@/libs/apiClient';
import { Button, ButtonKinds } from '@/components/Button';

import styles from '@/pages/Landing/styles.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { getNftCollectionData } from '@/helpers';
import { isTestnet } from '@/helpers/location';
import { showcaseEditions } from './showcaseEdition';
import { ManagerContract } from '@/libs/apiClient/types';


function ShowcaseSection() {
	const tonClient = useTonClient();
	const [editions, setEditions] = useState<IEditionItem[]>([]);

	const getEditions = useCallback(async () => {
		try {
			const testnet = isTestnet()
			let contracts: ManagerContract[];
			if(testnet) {
				const managerContracts = await getManagerContracts()
				contracts = managerContracts.result;
			} else {
				contracts = showcaseEditions;
			}

			const result = contracts.map(data => {
				return {
					collectionAddress: data.collectionAddress,
					content: data.overviewData.content,
					dateStart: data.overviewData.dateStart,
					dateEnd: data.overviewData.dateEnd,
					price: data.overviewData.price,
					minted: null,
					limit: data.overviewData.limit,
					name: data.overviewData.name,
					owner: data.overviewData.owner,
				};
			});

			setEditions(result.slice(0, 3));
		} catch (error) {
			console.log('error', error);
		}
	}, [tonClient]);

	const getMintData = useCallback(async () => {
		if (!tonClient) return;

		const editionsWithActualMintNumber = await Promise.all(
			editions.map(async edition => {
				const collectionData = await getNftCollectionData(tonClient, edition.collectionAddress);

				return {
					...edition,
					minted: collectionData.nextItemIndex || 0,
				};
			})
		);

		setEditions(editionsWithActualMintNumber);
	}, [tonClient, editions]);

	useEffect(() => {
		if (editions.length > 0) {
			getMintData();
		}
	}, [tonClient, editions.length]);

	useEffect(() => {
		getEditions();
	}, []);

	return (
		<section className={styles.showcaseSection} id="landingShowcase">
			<div className={styles.showcaseSectionGrid}>
				{editions &&
					editions.map(edition => (
						<EditionCard edition={edition} key={edition.collectionAddress} />
					))}
			</div>
			
			<div className={styles.showcaseSectionExplore}>
				<Button componentType="link" basicInverted kind={ButtonKinds.basic} to="/explore">
					Explore more
				</Button>
			</div>
		</section>
	);
}

export default ShowcaseSection;
