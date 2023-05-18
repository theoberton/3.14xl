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
		start: Date | null;
		end: Date | null;
	};
	price: string;
	isSoulbound: boolean;
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
	dateStart: number;
	dateEnd: number;
	payoutAddress: string;
	isSoulbound?: boolean;
	isPixelFeeDisabled?: boolean;
}
