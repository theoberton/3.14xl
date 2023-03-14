import {
	Address,
	toNano,
	beginCell,
	Cell,
	ContractProvider,
	Sender,
	SendMode,
	TupleBuilder,
} from 'ton-core';

import {
	GetRoyaltyParamsBodyParams,
	RoyaltyParams,
	BaseTransactionArgs,
	MintBodyParams,
	ChangeOwnerBodyParams,
	EditContentParams,
	NftCollectionDataOptional,
} from '../types';

import { Queries, buildNftCollectionStateInit } from './helpers';
import { decodeOffChainContent } from './../utils/nft-content';
import { BaseLocalContract } from '../core/BaseLocalContract';

const defaultCommandArgs: BaseTransactionArgs = {
	value: toNano('0.2'),
	sendMode: SendMode.PAY_GAS_SEPARATELY,
	bounce: false,
};

/*
 storage scheme
 default#_ royalty_factor:uint16 royalty_base:uint16 royalty_address:MsgAddress = RoyaltyParams;
 storage#_ owner_address:MsgAddress next_item_index:uint64
           ^[collection_content:^Cell common_content:^Cell]
           nft_item_code:^Cell
           royalty_params:^RoyaltyParams
           = Storage;
 */

export class NftCollection extends BaseLocalContract {
	constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {
		super(address, init);
	}

	static createFromAddress(address: Address) {
		return new NftCollection(address);
	}

	static createFromConfig(configData: NftCollectionDataOptional, code?: Cell) {
		const { stateInit, address } = buildNftCollectionStateInit(configData, code);

		return new NftCollection(address, stateInit);
	}

	async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
		await provider.internal(via, {
			value,
			sendMode: SendMode.PAY_GAS_SEPARATELY,
			body: beginCell().endCell(),
		});
	}

	/* Commands */

	async sendEditContent(
		provider: ContractProvider,
		via: Sender,
		params: EditContentParams,
		args: BaseTransactionArgs = defaultCommandArgs
	) {
		const msgBody = Queries.editContent(params);

		await provider.internal(via, {
			...args,
			body: msgBody,
		});
	}

	async sendNewNftItem(
		provider: ContractProvider,
		via: Sender,
		params: MintBodyParams,
		args: BaseTransactionArgs = defaultCommandArgs
	) {
		const msgBody = Queries.mint(params);

		await provider.internal(via, {
			...args,
			body: msgBody,
		});
	}

	async sendChangeOwner(
		provider: ContractProvider,
		via: Sender,
		params: ChangeOwnerBodyParams,
		args: BaseTransactionArgs = defaultCommandArgs
	) {
		const msgBody = Queries.changeOwner(params);

		await provider.internal(via, {
			...args,
			body: msgBody,
		});
	}

	async sendGetRoyaltyParams(
		provider: ContractProvider,
		via: Sender,
		params: GetRoyaltyParamsBodyParams,
		args: BaseTransactionArgs = defaultCommandArgs
	) {
		const msgBody = Queries.getRoyaltyParams(params);

		await provider.internal(via, {
			...args,
			body: msgBody,
		});
	}
	/* Queries */

	async getCollectionData(provider: ContractProvider): Promise<{
		nextItemIndex: number;
		ownerAddress: Address;
		collectionContentUri: string;
	}> {
		const { stack } = await provider.get('get_collection_data', []);

		const nextItemIndex = stack.readNumber();
		const collectionContent = stack.readCell();
		const collectionContentUri = decodeOffChainContent(collectionContent);
		const ownerAddress = stack.readAddress();

		return {
			nextItemIndex,
			collectionContentUri,
			ownerAddress,
		};
	}

	async getNftAddressByIndex(provider: ContractProvider, index: number): Promise<Address> {
		const args = new TupleBuilder();

		args.writeNumber(index);

		const { stack } = await provider.get('get_nft_address_by_index', args.build());

		return stack.readAddress();
	}

	async getRoyaltyParams(provider: ContractProvider): Promise<RoyaltyParams> {
		const { stack } = await provider.get('royalty_params', []);

		const royaltyFactor = stack.readNumber();
		const royaltyBase = stack.readNumber();
		const royaltyAddress = stack.readAddress();

		return {
			royaltyFactor,
			royaltyBase,
			royaltyAddress,
		};
	}

	async getNftItemContent(provider: ContractProvider, index: number, individualContent: Cell) {
		const args = new TupleBuilder();

		args.writeNumber(index);
		args.writeCell(individualContent);

		const { stack } = await provider.get('get_nft_content', args.build());

		return decodeOffChainContent(stack.readCell());
	}
}
