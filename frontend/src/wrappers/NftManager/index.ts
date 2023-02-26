import { TupleBuilder, Address, beginCell, Cell, ContractProvider, Sender, toNano } from 'ton-core';
import { BaseLocalContract } from '../core/BaseLocalContract';
import { calcPercent } from '../../helpers/math';

import { NftManagerInitData, NftManagerData, SendMintParams } from './../types';

import { buildNftManagerStateInit, Queries } from './helpers';

export class NftManager extends BaseLocalContract {
	constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {
		super(address, init);
	}

	static createFromAddress(address: Address) {
		return new NftManager(address);
	}
	static createFromConfig(configData: NftManagerInitData, code?: Cell) {
		const initData = buildNftManagerStateInit(configData, code);

		return new NftManager(initData.address, initData.stateInit);
	}

	async sendSetCollectionAddress(
		provider: ContractProvider,
		via: Sender,
		params: {
			value?: bigint;
			collectionAddress: Address;
		}
	) {
		await provider.internal(via, {
			value: params.value ?? toNano('1'),
			body: beginCell()
				.storeUint(435957060, 32) // op
				.storeAddress(params.collectionAddress)
				.endCell(),
		});
	}

	async sendMintSafe(
		provider: ContractProvider,
		via: Sender,
		params: SendMintParams,
		mintPrice: bigint
	) {
		const msgBody = Queries.safeMint(params);
		await provider.internal(via, {
			value: mintPrice + calcPercent(mintPrice, 0.01) + toNano('0.2'),
			body: msgBody,
		});
	}

	async getCollectionAddress(provider: ContractProvider): Promise<Address> {
		const { stack } = await provider.get('nft_collection_address', new TupleBuilder().build());

		return stack.readAddress();
	}

	async getOwner(provider: ContractProvider): Promise<Address> {
		const { stack } = await provider.get('owner', new TupleBuilder().build());

		return stack.readAddress();
	}

	async getManagerData(provider: ContractProvider): Promise<NftManagerData> {
		const { stack } = await provider.get('get_manager_data', new TupleBuilder().build());

		return {
			owner: stack.readAddress(),
			debug: stack.readNumber(),
			nftCollectionAddress: stack.readAddress(),
			mintPrice: stack.readBigNumber(),
			maxSupply: stack.readNumber(),
			mintDateStart: stack.readNumber(),
			mintDateEnd: stack.readNumber()
		};
	}
}
