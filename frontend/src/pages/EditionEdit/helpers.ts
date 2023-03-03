import { TonConnectUI } from '@tonconnect/ui-react';
import { ThirdwebStorage } from '@thirdweb-dev/storage';

const storage = new ThirdwebStorage();

import { toNano, Address } from 'ton-core';

import { NftCollection } from '@/wrappers';
import { TonClient } from 'ton';
import { UpdateEditionParams } from './interfaces';
import { Queries } from '@/wrappers/NftManager/helpers';
import { CollectionContent } from '@/wrappers/types';

export const updateEdition = async (
	tonClient: TonClient,
	tonConnectUI: TonConnectUI,
	collectionAddress: string,
	accountAddress: string,
	params: UpdateEditionParams,
	sourceEditionData: CollectionContent,
	turnOffFormSubmitting: () => void
) => {
	/** Upload collection metadata */
	const content: CollectionContent = {
		...sourceEditionData,
		...params,
	};

	const collectionContentUri = await storage.upload(content, { uploadWithGatewayUrl: true });
	const collectionContentUrl = storage.resolveScheme(collectionContentUri);

	const managerEditData = {
		payoutAddress: Address.parse(params.payoutAddress),
		mintPrice: toNano(params.price),
		mintDateStart: BigInt(params.dateStart),
		mintDateEnd: BigInt(params.dateEnd),
		content: collectionContentUrl,
		commonContent: collectionContentUrl,
	};

	const managerEditDataPayload = Queries.editData(managerEditData);

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
