export type NftManagerInitData = {
	owner?: Address;
	payoutAddress: Address;
	mintPrice: bigint;
	maxSupply: bigint;
	mintDateStart: bigint;
	mintDateEnd: bigint;
	content: string;
	isPixelFeeDisabled?: boolean;
};

export type SetNftCollectionAddress = {
	$$type: 'SetNftCollectionAddress';
	nftCollectionAddress: Address;
};

export type ChangeOwnerOfCollection = {
	$$type: 'ChangeOwnerOfCollection';
	newOwner: Address;
};

export type ChangeOwnerOfCollectionParams = {
	newOwner: Address;
};

export type SendMintParams = {
	queryId?: number;
	nextItemIndex: number;
	itemOwner?: Address;
};

export type EditDataParams = {
	queryId?: int;
	content: string;
	mintPrice: bigint;
	mintDateStart: bigint;
	mintDateEnd: bigint;
	commonContent: string;
	payoutAddress: Address;
};

export type NftManagerData = {
	owner: Address;
	nftCollectionAddress: Address;
	mintPrice: bigint;
	maxSupply: number;
	mintDateStart: number;
	mintDateEnd: number;
	payoutAddress: Address;
};

export type MintSafe = {
	$$type: 'MintSafe';
	queryId: int;
	nextItemIndex: int;
	itemOwner: Address;
};

export type EditData = {
	$$type: 'EditData';
	queryId: bigint;
	content: string;
	commonContent: string;
	mintPrice: bigint;
	mintDateStart: bigint;
	mintDateEnd: bigint;
	payoutAddress: Address;
};
