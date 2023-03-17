import { fromUnixToDate } from '@/utils';
import { CollectionContent } from '@/wrappers/types';

export function composeEditObject(source: Partial<CollectionContent>) {
	return {
		symbol: source.symbol,
		description: source.description,
		media: source.image,
		price: source.price,
		name: source.name,
		maxSupply: source.maxSupply,
		validity: {
			start: source.dateStart ? fromUnixToDate(source.dateStart) : null,
			end: source.dateEnd ? fromUnixToDate(source.dateEnd) : null,
		},
		payoutAddress: source.payoutAddress,
	};
}
