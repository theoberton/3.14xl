import { TonConnectUI } from '@tonconnect/ui-react';
import { ThirdwebStorage } from '@thirdweb-dev/storage';

const storage = new ThirdwebStorage();

import { toNano, Address } from 'ton-core';

import { NftManager, NftCollection } from '@/wrappers';
import { NftCollectionDataOptional } from '@/wrappers/types';
import { TonClient } from 'ton';
import { UpdateOwnerParams } from './interfaces';
import { Queries } from '@/wrappers/NftManager/helpers';
import { CollectionContent } from '@/wrappers/types';

export const updateOwner = async (
	tonClient: TonClient,
	tonConnectUI: TonConnectUI,
	collectionAddress: string,
	params: UpdateOwnerParams,
	turnOffFormSubmitting: () => void
) => {
	const managerEditData = {
		newOwner: Address.parse(params.managerAddress),
	};

	const managerEditDataPayload = Queries.changeOwner(managerEditData);

	const nftCollection = NftCollection.createFromAddress(Address.parse(collectionAddress));
	const nftCollectionContract = tonClient.open(nftCollection);

	const { ownerAddress } = await nftCollectionContract.getCollectionData();

	const transaction = {
		validUntil: Date.now() + 1000000,
		messages: [
			{
				address: ownerAddress.toString(),
				amount: toNano('0.1').toString(),
				payload: managerEditDataPayload.toBoc().toString('base64'),
			},
		],
	};

	turnOffFormSubmitting();
	await tonConnectUI.sendTransaction(transaction);

	// you can use signed boc to find the transaction
	// const someTxData = await myAppExplorerService.getTransaction(result.boc);
	// alert('Transaction was sent successfully', someTxData);
};
