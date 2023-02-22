import { beginCell, Cell, Builder, contractAddress } from 'ton-core';

import { MintSafe, NftManagerInitData, SetNftCollectionAddress, SendMintParams } from './../types';
import { NftManagerOpcodes } from '../constants';

import { NftManagerCodeCell, NftManagerSystemCell } from './NftManager.source';
import { Address } from 'ton-core';

export function buildNftManagerDataCell(managerData: NftManagerInitData, systemCell: Cell) {
	let data = beginCell()
		.storeRef(systemCell)
		.storeAddress(managerData.owner)
		.storeInt(managerData.debug ?? Math.floor(Math.random() * 10000), 16)
		.storeAddress(managerData.owner)
		.storeCoins(managerData.mintPrice)
		.storeInt(managerData.maxSupply ?? 0, 257)
		.endCell();
	return data;
}

export function buildNftManagerStateInit(
	managerData: NftManagerInitData,
	code = NftManagerCodeCell
) {
	const data = buildNftManagerDataCell(managerData, NftManagerSystemCell);

	const stateInit = { code, data };
	let address = contractAddress(0, stateInit);

	return {
		stateInit,
		address,
	};
}

// Tact-generated payload builders
export function storeSetNftCollectionAddress(src: SetNftCollectionAddress) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(435957060, 32);
		b_0.storeAddress(src.nftCollectionAddress);
	};
}

export function storeMintSafe(src: MintSafe) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(NftManagerOpcodes.MintSafe, 32);
		b_0.storeUint(src.queryId, 64);
		b_0.storeUint(src.nextItemIndex, 64);
		b_0.storeAddress(src.itemOwner);
	};
}

// End

export const Queries = {
	safeMint: (params: SendMintParams): Cell => {
		return beginCell()
			.store(
				storeMintSafe({
					$$type: 'MintSafe',
					queryId: params.queryId,
					nextItemIndex: params.nextItemIndex,
					itemOwner: params.itemOwner,
				})
			)
			.endCell();
	},
	setNftCollectionAddress: (nftCollectionAddress: Address): Cell => {
		return beginCell()
			.store(
				storeSetNftCollectionAddress({
					$$type: 'SetNftCollectionAddress',
					nftCollectionAddress: nftCollectionAddress,
				})
			)
			.endCell();
	},
};
