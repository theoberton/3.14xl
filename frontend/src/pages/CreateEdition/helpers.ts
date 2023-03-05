import { TonConnectUI } from '@tonconnect/ui-react';
import { ThirdwebStorage } from '@thirdweb-dev/storage';

const storage = new ThirdwebStorage();

import { toNano, Address } from 'ton-core';

import { NftManager, NftCollection } from '@/wrappers';
import { NftCollectionDataOptional } from '@/wrappers/types';
import { TonClient } from 'ton';
import { CreateEditionParams } from './interfaces';
import { Queries } from '@/wrappers/NftManager/helpers';
import { CollectionContent } from '@/wrappers/types';

export const createEdition = async (
	tonClient: TonClient,
	tonConnectUI: TonConnectUI,
	params: CreateEditionParams,
	turnOffFormSubmitting: () => void
) => {
	/** Upload collection metadata */
	const content: CollectionContent = {
		name: params.name,
		description: params.description,
		image: params.image,
		// external_link: 'https://matketplacecreatures.io',
		// seller_fee_basis_points: 100,
		// fee_recipient: address,
		royalty: String(Number(params.royalty) / 100),
		price: params.price,
		maxSupply: params.maxSupply,
		dateStart: params.dateStart,
		dateEnd: params.dateEnd,
		symbol: params.symbol,
		payoutAddress: params.payoutAddress,
		feeRecipient: params.payoutAddress,
	};

	const collectionContentUri = await storage.upload(content, { uploadWithGatewayUrl: true });
	const collectionContentUrl = storage.resolveScheme(collectionContentUri);

	const ownerAddress = Address.parse(params.creatorAddress);

	const managerInitData = {
		owner: ownerAddress,
		content: collectionContentUrl,
		mintPrice: toNano(params.price),
		maxSupply: BigInt(params.maxSupply),
		mintDateStart: BigInt(params.dateStart),
		mintDateEnd: BigInt(params.dateEnd),
		payoutAddress: Address.parse(params.payoutAddress),
	};

	const nftManager = NftManager.createFromConfig(managerInitData);
	const nftManagerContract = tonClient.open(nftManager);

	console.log('nftManagerContract.address', nftManagerContract.address.toString());

	const nftCollectionInitData: NftCollectionDataOptional = {
		ownerAddress: nftManagerContract.address,
		collectionContentUri: collectionContentUrl,
		commonContent: collectionContentUrl,
		royaltyParams: {
			royaltyBase: 100,
			royaltyFactor: Number(params.royalty),
			royaltyAddress: ownerAddress,
		},
	};

	const nftCollection = NftCollection.createFromConfig(nftCollectionInitData);
	const nftCollectionContract = tonClient.open(nftCollection);
	const nftCollectionAddress = nftCollectionContract.address.toString();
	const nftCollectionStateInit = nftCollectionContract.createStateInitAsBase64();

	const nftManagerStateInit = nftManagerContract.createStateInitAsBase64();
	const nftManagerAddress = nftManagerContract.address.toString();
	const nftManagerPayload = Queries.setNftCollectionAddress(nftCollectionContract.address);

	const transaction = {
		validUntil: Date.now() + 1000000,
		messages: [
			{
				address: nftCollectionAddress,
				amount: toNano('0.05').toString(),
				stateInit: nftCollectionStateInit,
			},
			{
				address: nftManagerAddress,
				amount: toNano('0.05').toString(),
				payload: nftManagerPayload.toBoc().toString('base64'),
				stateInit: nftManagerStateInit,
			},
		],
	};

	turnOffFormSubmitting();
	await tonConnectUI.sendTransaction(transaction);

	// you can use signed boc to find the transaction
	// const someTxData = await myAppExplorerService.getTransaction(result.boc);
	// alert('Transaction was sent successfully', someTxData);

	return { collectionAddress: nftCollectionAddress };
};
