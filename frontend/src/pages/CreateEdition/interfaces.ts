import { EDITIONS_SIZES } from '@/constants/common';

export interface FormValues {
	name: string;
	symbol: string;
	description: string;
	media: string | null;
	editionSize: {
		type: EDITIONS_SIZES;
		amount: string;
	};
	royalty: string;
	validity: {
		start: string | null;
		end: string | null;
	};
	price: string;
	payoutAddress: string;
}

export interface CreateEditionParams {
	name: string;
	description: string;
	image: string;
	symbol: string;
	creatorAddress: string;
	price: string;
	royalty: string;
	maxSupply: string;
}

export type CreateEditionCollectionContent = {
	name: string;
	description: string;
	image: string;
	price: string;
	maxSupply: string;
	royalty: string;
	symbol: string;
	feeRecipient: string;
};
