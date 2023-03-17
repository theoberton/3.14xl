import { TELEGRAM_WEB_APP_ACTION } from '@/constants/common';

export type ManagerContract = {
	contractAddress: string;
	ownerAddress: string;
	collectionAddress: string;
	overviewData: {
		collectionAddress: string;
		content: string;
		price: string;
		minted: number;
		limit: number;
		name: string;
		owner: string;
		dateStart: number;
		dateEnd: number;
		payoutAddress: string;
		maxSupply: string;
	};
};

export type ManagerContractList = {
	count: number;
	result: [ManagerContract];
};

export type TelegramMessage = {
	action: TELEGRAM_WEB_APP_ACTION;
	payload: {
		chatId: number;
		message: string;
		link: string;
		edtionName: string;
	};
};
