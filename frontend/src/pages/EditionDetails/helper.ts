import { CollectionContent } from '@/wrappers/types';
import { toNano, Address } from 'ton-core';
import { Queries } from '@/wrappers/NftManager/helpers';
import { calcPercent, EditionData } from '@/helpers';

export function composeMintTransaction(
	collectionData: EditionData,
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
				amount: (
					toNano(content.price) +
					calcPercent(toNano(content.price), 0.05) +
					toNano('1')
				).toString(),
				payload: payload.toBoc().toString('base64'),
			},
		],
	};

	return transaction;
}
