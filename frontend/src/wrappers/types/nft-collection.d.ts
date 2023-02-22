import { Contract, ContractProvider, Cell, Address, Sender } from 'ton-core';

export interface MintBodyParams {
	itemIndex: number;
	amount: bigint;
	itemOwnerAddress: Address;
	itemContent: string;
	queryId?: number;
}
export interface GetRoyaltyParamsBodyParams {
	queryId?: number;
}
export interface ChangeOwnerBodyParams {
	queryId?: number;
	newOwnerAddress: Address;
}

export interface CollectionData {
	nextItemIndex: number;
	ownerAddress: Address;
	collectionContentUri: string;
}

export type CollectionContent = {
	name: string;
	description: string;
	image: string;
	price: string;
	maxSupply: string;
	symbol: string;
	feeRecipient: string;
};

export interface RoyaltyParams {
	royaltyFactor: number;
	royaltyBase: number;
	royaltyAddress: Address;
}

export interface EditContentParams {
	queryId?: number;
	collectionContentUri: string;
	commonContent: string;
	royaltyParams: RoyaltyParams;
}

export interface NftCollectionData {
	ownerAddress: Address;
	nextItemIndex: number | bigint;
	collectionContentUri: string;
	commonContent: string;
	nftItemCode: Cell;
	royaltyParams: RoyaltyParams;
}

export interface NftCollectionDataOptional extends Partial<NftCollectionData> {}

export interface CollectionMintItemInput {
	passAmount: bigint;
	index: number;
	ownerAddress: Address;
	content: string;
}

export interface GetStaticDataParams {
	queryId?: number;
}
export interface GetRoyaltyParams {
	queryId?: number;
}
export interface TransferEditorshipParams {
	queryId?: number;
	newEditor: Address;
	responseTo: Address | null;
	forwardAmount?: bigint;
}

export declare class NftCollection implements Contract {
	private readonly royaltyBase;
	private readonly royaltyFactor;
	readonly address: Address;
	constructor(address: Address, init?: { code: Cell; data: Cell });
	mintNftItem(provider: ContractProvider, via: Sender, params: MintBodyParams): Cell;
	createGetRoyaltyParamsBody(params: GetRoyaltyParamsBodyParams): Cell;
	createChangeOwnerBody(params: ChangeOwnerBodyParams): Cell;
	getCollectionData(): Promise<CollectionData>;
	getNftItemContent(
		provider: ContractProvider,
		index: number,
		individualContent: Cell
	): Promise<NftItemContent>;
	getNftItemAddressByIndex(provider: ContractProvider, index: number): Promise<Address>;
	getRoyaltyParams(provider: ContractProvider): Promise<RoyaltyParams>;
	/**
	 * Returns cell that contains NFT collection data.
	 */
	protected createDataCell(): Cell;
}
