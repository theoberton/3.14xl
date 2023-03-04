import { CollectionContent } from '@/wrappers/types';
import { Address } from 'ton-core';

export interface FormValues {
	name?: string;
	symbol?: string;
	description: string;
	media: string | null;
	validity: {
		start: Date | null;
		end: Date | null;
	};
	price: string;
	payoutAddress: string;
}

export interface UpdateEditionParams {
	image: string;
	description: string;
	payoutAddress: string;
	price: string;
	dateStart: number;
	dateEnd: number;
}

export interface EditionData {
	collectionData: {
		nextItemIndex: number;
		ownerAddress: Address;
		collectionContentUri: string;
	};
	content: CollectionContent;
	managerAddress: Address;
}

export interface DeploymentState {
	isModalOpened: boolean;
	address: string;
	editionName: string;
}
