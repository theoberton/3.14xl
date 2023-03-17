import EditionsHeader from './Header';
import { Helmet } from 'react-helmet-async';
import { EditionCard } from '@/components';
import { getManagerContracts } from '@/libs/apiClient';
import { PageLoader } from '@/components';

import styles from './styles.module.scss';

import { useTonClient } from '@/hooks';
import { useEffect, useCallback, useState } from 'react';
import { IEditionItem } from '@/components/EditionCard/interface';
import { getNftCollectionData } from '@/helpers';
import _ from 'lodash';

export default function ExplorePage() {
	const tonClient = useTonClient();
	const [isLoading, setLoading] = useState(false);
	const [editions, setEditions] = useState<IEditionItem[]>([]);

	const getEditions = useCallback(async () => {
		try {
			setLoading(true);
			const contracts = await getManagerContracts();

			const result = contracts.result.map(data => {
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

			setEditions(result);
		} catch (error) {
			console.log('error', error);
		} finally {
			setLoading(false);
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
		getEditions();
	}, []);

	useEffect(() => {
		if (editions.length > 0) {
			getMintData();
		}
	}, [tonClient, editions.length]);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<div className={styles.editionsContainer}>
			<Helmet title={'3.14XL - Explore editions'} />
			<EditionsHeader />
			<div className={styles.editionsShowCase}>
				{editions &&
					editions.map(edition => (
						<EditionCard edition={edition} key={edition.collectionAddress} />
					))}
			</div>
		</div>
	);
}
