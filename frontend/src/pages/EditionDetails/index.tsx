import { useAsync } from 'react-use';

import { useParams } from 'react-router-dom';

import EditionDetails from './Details';
import EditionPreview from './Preview';
import styles from './styles.module.scss';
import { CollectionContent } from '@/wrappers/types';
import { NftCollection } from '@/wrappers/NftCollection';
import { Address } from 'ton-core';
import { useTonClient } from '@/hooks/useTonClient';

export default function EditionDetailsPage() {
	const { collectionAddress } = useParams();
	const tonClient = useTonClient();

	const collectionDataAsync = useAsync(async () => {
		if (!collectionAddress || !tonClient) {
			throw new Error();
		}

		const nftCollection = NftCollection.createFromAddress(Address.parse(collectionAddress));
		const nftColelctionContract = tonClient.open(nftCollection);
		const collectionData = await nftColelctionContract.getCollectionData();
		const content: CollectionContent = await fetch(collectionData.collectionContentUri).then(res =>
			res.json()
		);

		return { collectionData, content };
	}, [tonClient]);

	if (collectionDataAsync.loading) {
		return <div>loading...</div>;
	}

	if (collectionDataAsync.error) {
		console.error(collectionDataAsync.error);
		return <div>Waiting for deploy...</div>;
	}

	if (!collectionDataAsync.value) {
		console.error('No value');
		return <div>Something went wrong</div>;
	}

	return (
		<div className={styles.editionDetailsContainer}>
			<EditionPreview
				collectionData={collectionDataAsync.value.collectionData}
				content={collectionDataAsync.value.content}
			/>
			<EditionDetails
				collectionData={collectionDataAsync.value.collectionData}
				content={collectionDataAsync.value.content}
			/>
		</div>
	);
}
