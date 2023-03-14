import { Address, toNano, Cell, ContractProvider, Sender, SendMode } from 'ton-core';

import { decodeOffChainContent } from './../utils/nft-content';
import { BaseTransactionArgs, NftDataResponse, NftItemData } from './../types';
import { Queries, buildNftItemStateInit } from './helpers';
import { BaseLocalContract } from '../core/BaseLocalContract';

const defaultCommandArgs: BaseTransactionArgs = {
	value: toNano('0.1'),
	sendMode: SendMode.PAY_GAS_SEPARATELY,
	bounce: false,
};

export class NftItem extends BaseLocalContract {
	constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {
		super(address, init);
	}

	static createFromAddress(address: Address) {
		return new NftItem(address);
	}

	static createFromConfig(config: NftItemData, code?: Cell) {
		const { stateInit, address } = buildNftItemStateInit(config, code);

		return new NftItem(address, stateInit);
	}

	async sendDeploy(provider: ContractProvider, via: Sender, params: NftItemData, value: bigint) {
		const msgBody = Queries.composeInitMessage(params);

		await provider.internal(via, {
			value,
			sendMode: SendMode.PAY_GAS_SEPARATELY,
			body: msgBody,
		});
	}

	/* Queries */

	async getData(provider: ContractProvider): Promise<NftDataResponse> {
		const { stack } = await provider.get('get_nft_data', []);
		const initializedStatus = stack.readNumber();
		const index = stack.readNumber();
		const collectionAddress = stack.readAddress();
		const ownerAddress = stack.readAddress();

		const isInitialized = initializedStatus === -1;

		if (!isInitialized) {
			return {
				isInitialized: false,
				index,
				collectionAddress,
			};
		}

		const content = stack.readCell();

		return {
			isInitialized: true,
			index,
			collectionAddress,
			ownerAddress,
			content: decodeOffChainContent(content),
			contentRaw: content,
		};
	}

	async sendTransfer(
		provider: ContractProvider,
		via: Sender,
		params: { queryId?: number; newOwner: Address; responseTo?: Address; forwardAmount?: bigint },
		args: BaseTransactionArgs = defaultCommandArgs
	) {
		const msgBody = Queries.transfer(params);

		await provider.internal(via, {
			...args,
			body: msgBody,
		});
	}

	async sendGetStaticData(
		provider: ContractProvider,
		via: Sender,
		args: BaseTransactionArgs = defaultCommandArgs
	) {
		const msgBody = Queries.getStaticData({});

		await provider.internal(via, {
			...args,
			body: msgBody,
		});
	}
}
