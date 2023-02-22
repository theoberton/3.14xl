import { TonConnectUI } from '@tonconnect/ui-react';
import { ThirdwebStorage } from '@thirdweb-dev/storage';

const storage = new ThirdwebStorage();

import { toNano, Address } from 'ton-core';

import { NftManager, NftCollection } from '@/wrappers';
import { NftCollectionDataOptional } from '@/wrappers/types';
import { TonClient } from 'ton';
import { CreateEditionParams, CreateEditionCollectionContent } from './interfaces';
import { Queries } from '@/wrappers/NftManager/helpers';

export const createEdition = async (
	tonClient: TonClient,
	tonConnectUI: TonConnectUI,
	params: CreateEditionParams
) => {
	/** Upload collection metadata */
	const content: CreateEditionCollectionContent = {
		name: params.name,
		description: params.description,
		image: params.image,
		// external_link: 'https://matketplacecreatures.io',
		// seller_fee_basis_points: 100,
		// fee_recipient: address,
		royalty: params.royalty,
		price: params.price,
		maxSupply: params.maxSupply,
		symbol: params.symbol,
		feeRecipient: params.creatorAddress,
	};

	const collectionContentUri = await storage.upload(content, { uploadWithGatewayUrl: true });
	const collectionContentUrl = storage.resolveScheme(collectionContentUri);

	const ownerAddress = Address.parse(params.creatorAddress);

	const nftManagerParams = {
		owner: ownerAddress,
		seed: BigInt(Math.floor(Math.random() * 10000)),
		mintPrice: toNano(params.price),
		maxSupply: BigInt(params.maxSupply),
	};
	const managerInitData = {
		owner: nftManagerParams.owner,
		debug: nftManagerParams.seed,
		mintPrice: nftManagerParams.mintPrice,
		maxSupply: nftManagerParams.maxSupply,
	};

	const nftManager = NftManager.createFromConfig(managerInitData);
	const nftManagerContract = tonClient.open(nftManager);

	const nftCollectionInitData: NftCollectionDataOptional = {
		ownerAddress: nftManagerContract.address, // Check if it works again
		collectionContent: collectionContentUrl,
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

	const result = await tonConnectUI.sendTransaction(transaction);
	console.log(result);
	// you can use signed boc to find the transaction
	// const someTxData = await myAppExplorerService.getTransaction(result.boc);
	// alert('Transaction was sent successfully', someTxData);

	return { collectionAddress: nftCollectionAddress };
};
