import { TonClient } from 'ton';
import { Address } from 'ton-core';
import { NftCollection, NftManager } from '@/wrappers';
import { CollectionContent, NftManagerData } from '@/wrappers/types';

export type ManagerFullData = {
	collectionData: EditionData;
	content: CollectionContent;
	managerAddress: string;
	managerData: NftManagerData;
};

export type EditionData = {
	ownerAddress: string;
	address: string;
	nextItemIndex: number;
	collectionContentUri: string;
};

export async function getFullNftCollectionData(tonClient: TonClient, collectionAddress: string) {
	const nftCollection = NftCollection.createFromAddress(Address.parse(collectionAddress));
	const nftColelctionContract = tonClient.open(nftCollection);

	const collectionData = await nftColelctionContract.getCollectionData();

	const content: CollectionContent = await fetch(collectionData.collectionContentUri).then(res =>
		res.json()
	);

	const nftManager = NftManager.createFromAddress(collectionData.ownerAddress);
	const nftManagerContract = tonClient.open(nftManager);
	const managerData = await nftManagerContract.getManagerData();

	return {
		collectionData: {
			...collectionData,
			ownerAddress: collectionData.ownerAddress.toString(),
			address: collectionAddress,
		},
		content,
		managerAddress: String(managerData.owner.toString()),
		managerData,
	};
}

export async function getNftCollectionData(tonClient: TonClient, collectionAddress: string) {
	const nftCollection = NftCollection.createFromAddress(Address.parse(collectionAddress));
	const nftColelctionContract = tonClient.open(nftCollection);

	const collectionData = await nftColelctionContract.getCollectionData();

	return collectionData;
}

export function composeEditionOverviewData(data: ManagerFullData) {
	return {
		collectionAddress: data.collectionData.address,
		content: data.content.image,
		price: data.content.price,
		minted: data.collectionData.nextItemIndex,
		limit: data.managerData.maxSupply ?? null,
		name: data.content.name,
		owner: data.managerAddress,
		dateStart: data.content.dateStart,
		dateEnd: data.content.dateEnd,
		payoutAddress: data.content.payoutAddress,
		maxSupply: data.content.maxSupply,
	};
}
