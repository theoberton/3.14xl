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
