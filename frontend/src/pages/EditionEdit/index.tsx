import { useCallback, useState, Context, Provider, useMemo, useEffect } from 'react';
import { useAsync, useGetSetState, useAsyncRetry } from 'react-use';
import { Address } from 'ton-core';
import { useTonClient } from '@/hooks/useTonClient';
import { NftCollection, NftManager } from '@/wrappers';
import { CollectionContent } from '@/wrappers/types';
import { useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from 'react-helmet-async';
import { PageLoader } from '@/components';
import {convertToBounceableAddress} from '@/helpers'

import { initialDeploymentState } from '@/pages/EditionEdit/constants';
import { DeploymentContext } from '@/pages/EditionEdit/deploymentContext';
import { Content } from '@/pages/EditionEdit/Content';
import { useTonAddress } from '@tonconnect/ui-react';
// Hotfix for https://github.com/yocontra/react-responsive/issues/306, remove when resolved
console.log(useMediaQuery);

function EditionEdit() {
	const { collectionAddress } = useParams();
	const [editionName, setName] = useState<string>('');
	const accountAddress = useTonAddress();
	// const navigate = useNavigate();

	const [getContentDeploymentState, setContentDeploymentState] =
		useGetSetState(initialDeploymentState);
	const [getOwnerDeploymentState, setOwnerDeploymentState] = useGetSetState(initialDeploymentState);

	const setEditionName = useCallback(
		(name: string) => {
			setName(name);
		},
		[setName]
	);

	const tonClient = useTonClient();

	const collectionDataAsync = useAsyncRetry(async () => {
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

	const mangerAddress = convertToBounceableAddress(collectionDataAsync.value?.managerAddress.toString());
	const loggedAccountAddress = convertToBounceableAddress(accountAddress);

	const isUserCollection = mangerAddress == loggedAccountAddress;
	const isFormDisabled = Boolean(mangerAddress && !isUserCollection);

	const contentDeploymentState = getContentDeploymentState();
	const ownerDeploymentState = getOwnerDeploymentState();

	const ContextProviderValue = useMemo(
		() => ({
			editionName,
			setEditionName,
			ownerDeploymentState,
			contentDeploymentState,
			isFormDisabled,
			setContentDeploymentState,
			setOwnerDeploymentState,
		}),
		[
			editionName,
			isFormDisabled,
			setEditionName,
			ownerDeploymentState,
			contentDeploymentState,
			setContentDeploymentState,
			setOwnerDeploymentState,
		]
	);

	useEffect(() => {
		if(ownerDeploymentState.deployCount || contentDeploymentState.deployCount) {
			collectionDataAsync.retry();
		}
	}, [ownerDeploymentState.deployCount, contentDeploymentState.deployCount]);

	if (collectionDataAsync.error && !collectionDataAsync.value) {
		return <div>Something went wrong</div>;
	}

	if (collectionDataAsync.loading || !collectionDataAsync.value) {
		return <PageLoader />;
	}

	return (
		<DeploymentContext.Provider value={ContextProviderValue}>
			<Helmet title={'3.14XL - Edit edition'} />
			<Content editionData={collectionDataAsync.value} />
		</DeploymentContext.Provider>
	);
}

export default EditionEdit;