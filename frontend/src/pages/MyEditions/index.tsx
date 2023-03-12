import EditionsHeader from './Header';
import { Helmet } from 'react-helmet-async';
import { EditionCard, PageLoader } from '@/components';
import { getManagerContractByOwner } from '@/libs/apiClient';
import { convertToBounceableAddress, getNftCollectionData } from '@/helpers';
import NoEditions from './NoEditions';

import styles from '@/pages/Explore/styles.module.scss';

import { useTonClient } from '@/hooks';
import { useTonAddress } from '@tonconnect/ui-react';
import { useCallback, useEffect, useState } from 'react';
import { IEditionItem } from '@/components/EditionCard/interface';

export default function MyEdition() {
	const tonClient = useTonClient();
	const address = useTonAddress();
	const [isLoading, setLoading] = useState(false);
	const [editions, setEditions] = useState<IEditionItem[]>([]);

	const getEditions = useCallback(async () => {
		const bouncableAddress = convertToBounceableAddress(address);
		if (!bouncableAddress) return;

		try {
			setLoading(true);
			const contracts = await getManagerContractByOwner(bouncableAddress);

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
	}, [tonClient, address]);

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
	}, [address]);

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
			{editions?.length ? (
				<>
					<EditionsHeader />
					<div className={styles.editionsShowCase}>
						{editions.map(edition => (
							<EditionCard edition={edition} key={edition.name + edition.owner} />
						))}
					</div>
				</>
			) : (
				<NoEditions />
			)}
		</div>
	);
}
