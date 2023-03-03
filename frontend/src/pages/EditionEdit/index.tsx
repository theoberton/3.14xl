import { useCallback, useState } from 'react';
import { useAsync, useGetSetState } from 'react-use';
import { Address } from 'ton-core';
import { useTonClient } from '@/hooks/useTonClient';
import { NftCollection, NftManager } from '@/wrappers';
import { CollectionContent } from '@/wrappers/types';
import { useNavigate, useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from 'react-helmet-async';
import { PageLoader } from '@/components';

import { Content } from '@/pages/EditionEdit/Content';
// Hotfix for https://github.com/yocontra/react-responsive/issues/306, remove when resolved
console.log(useMediaQuery);

const initialDeploymentState = {
	isModalOpened: false,
	address: '',
	editionName: '',
};

function EditionEdit() {
	const { collectionAddress } = useParams();
	const [editionName, setName] = useState<string>('');
	const [getContentdeploymentState, setContentDeploymentState] =
		useGetSetState(initialDeploymentState);
	const [getOwnerdeploymentState, setOwnerContentDeploymentState] =
		useGetSetState(initialDeploymentState);

	const setEditionName = useCallback(
		(name: string) => {
			setName(name);
		},
		[setName]
	);

	const tonClient = useTonClient();

	const collectionDataAsync = useAsync(async () => {
		if (!collectionAddress || !tonClient) {
			return null;
		}

		const nftCollection = NftCollection.createFromAddress(Address.parse(collectionAddress));
		const nftColelctionContract = tonClient.open(nftCollection);
		let collectionData = await nftColelctionContract.getCollectionData();
		const content: CollectionContent = await fetch(collectionData.collectionContentUri).then(res =>
			res.json()
		);

		setEditionName(content.name);

		const nftManager = NftManager.createFromAddress(collectionData.ownerAddress);
		const nftManagerContract = tonClient.open(nftManager);
		const managerData = await nftManagerContract.getManagerData();

		return { collectionData, content, managerAddress: managerData.owner };
	}, [tonClient, collectionAddress]);

	if (collectionDataAsync.error && !collectionDataAsync.value) {
		return <div>Something went wrong</div>;
	}

	if (collectionDataAsync.loading || !collectionDataAsync.value) {
		return <PageLoader />;
	}

	return (
		<>
			<Helmet title={'3.14XL - Edit edition'} />
			<Content
				deploymentState={getContentdeploymentState()}
				setDeploymentState={setContentDeploymentState}
				editionData={collectionDataAsync.value}
			/>
		</>
	);
}

export default EditionEdit;
