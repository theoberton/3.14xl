import { CollectionContent, CollectionData } from '@/wrappers/types';
import { toNano, Address } from 'ton-core';
import { Queries } from '@/wrappers/NftManager/helpers';

export function composeMintTransaction(
	collectionData: CollectionData,
	content: CollectionContent,
	address: Address
) {
	const nftManagerAddress = collectionData.ownerAddress;

	const payload = Queries.safeMint({
		itemOwner: address,
		queryId: 0,
		nextItemIndex: collectionData.nextItemIndex,
	});

	const transaction = {
		validUntil: Date.now() + 1000000,
		messages: [
			{
				address: nftManagerAddress.toString(),
				amount: (toNano('0.2') + toNano(content.price)).toString(),
				payload: payload.toBoc().toString('base64'),
			},
		],
	};

	return transaction;
}
