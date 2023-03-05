import { Address } from 'ton-core';
import { useCallback, useState } from 'react';
import { useAsyncRetry } from 'react-use';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageLoader } from '@/components';
import EditionDetails from './Details';
import EditionPreview from './Preview';
import styles from '@/pages/EditionDetails/styles.module.scss';
import { CollectionContent } from '@/wrappers/types';
import { NftCollection } from '@/wrappers/NftCollection';
import { useTonClient } from '@/hooks/useTonClient';
import { NftManager } from '@/wrappers';

export default function EditionDetailsPage() {
	const { collectionAddress } = useParams();
	const tonClient = useTonClient();
	const [currentNextNftItemIndex, setCurrentNftItemIndex] = useState(0);

	const collectionDataAsync = useAsyncRetry(async () => {
		if (!collectionAddress || !tonClient) {
			return null;
		}

		const nftCollection = NftCollection.createFromAddress(Address.parse(collectionAddress));
		const nftColelctionContract = tonClient.open(nftCollection);
		console.log('nftColelctionContract', nftColelctionContract.address.toString())
		let collectionData = await nftColelctionContract.getCollectionData();

		const content: CollectionContent = await fetch(collectionData.collectionContentUri).then(res =>
			res.json()
		);
		console.log('collectionData.ownerAddress', collectionData.ownerAddress.toString())

		const nftManager = NftManager.createFromAddress(collectionData.ownerAddress);
		const nftManagerContract = tonClient.open(nftManager);
		const managerData = await nftManagerContract.getManagerData();


		setCurrentNftItemIndex(collectionData.nextItemIndex);
		return { collectionData, content, managerAddress: managerData.owner };
	}, [tonClient, collectionAddress, currentNextNftItemIndex]);

	if (collectionDataAsync.error && !collectionDataAsync.value) {
		return <div>Something went wrong</div>;
	}

	if (collectionDataAsync.loading || !collectionDataAsync.value) {
		return <PageLoader />;
	}

	return (
		<div className={styles.editionDetailsContainer}>
			<Helmet title="3.14XL - Edition details" />
			<EditionPreview
				collectionData={collectionDataAsync.value.collectionData}
				content={collectionDataAsync.value.content}
			/>
			<EditionDetails
				setCurrentNftItemIndex={setCurrentNftItemIndex}
				currentNextNftItemIndex={currentNextNftItemIndex}
				editionData={collectionDataAsync.value}
			/>
		</div>
	);
}
