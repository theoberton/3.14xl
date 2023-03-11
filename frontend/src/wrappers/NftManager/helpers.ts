import { beginCell, Cell, Builder, contractAddress, Address } from 'ton-core';

import {
	MintSafe,
	NftManagerInitData,
	SetNftCollectionAddress,
	SendMintParams,
	EditData,
	EditDataParams,
	ChangeOwnerOfCollection,
	ChangeOwnerOfCollectionParams,
} from './../types';
import { NftManagerOpcodes } from '../constants';
import { encodeOffChainContent } from './../utils/nft-content';

import { NftManagerCodeCell, NftManagerSystemCell } from './NftManager.source';

export function buildNftManagerDataCell(managerData: NftManagerInitData, systemCell: Cell) {
	let collectionContent = encodeOffChainContent(managerData.content);

	let data = beginCell()
		.storeRef(systemCell)
		.storeUint(0, 1)
		.storeAddress(managerData.owner)
		.storeCoins(managerData.mintPrice)
		.storeInt(managerData.maxSupply ?? 0n, 32)
		.storeInt(managerData.mintDateStart ?? 0n, 32)
		.storeInt(managerData.mintDateEnd ?? 0n, 32)
		.storeAddress(managerData.payoutAddress)
		.storeRef(collectionContent)
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
		b_0.storeUint(NftManagerOpcodes.SetNftCollectionAddress, 32);
		b_0.storeAddress(src.nftCollectionAddress);
	};
}

export function storeMintSafe(src: MintSafe) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(NftManagerOpcodes.MintSafe, 32);
		b_0.storeUint(src.queryId ?? 0, 64);
		b_0.storeUint(src.nextItemIndex, 64);
		b_0.storeAddress(src.itemOwner);
	};
}

export function storeChangeOwnerOfCollection(src: ChangeOwnerOfCollection) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(NftManagerOpcodes.ChangeOwnerOfCollection, 32);
		b_0.storeAddress(src.newOwner);
	};
}

export function storeEditData(src: EditData) {
	let collectionContent = encodeOffChainContent(src.content);
	let commonContent = encodeOffChainContent(src.commonContent);
	let contentCell = beginCell();

	contentCell.storeRef(collectionContent);
	contentCell.storeRef(commonContent);

	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(NftManagerOpcodes.EditData, 32);
		b_0.storeUint(src.queryId ?? 0, 64);
		b_0.storeRef(contentCell);
		b_0.storeUint(src.mintPrice, 64);
		b_0.storeUint(src.mintDateStart ?? 0n, 32);
		b_0.storeUint(src.mintDateEnd ?? 0n, 32);
		b_0.storeAddress(src.payoutAddress);
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
	editData: (params: EditDataParams): Cell => {
		return beginCell()
			.store(
				storeEditData({
					$$type: 'EditData',
					content: params.content,
					commonContent: params.commonContent,
					queryId: params.queryId,
					mintPrice: params.mintPrice,
					mintDateStart: params.mintDateStart,
					mintDateEnd: params.mintDateEnd,
					payoutAddress: params.payoutAddress,
				})
			)
			.endCell();
	},
	changeOwner: (params: ChangeOwnerOfCollectionParams): Cell => {
		return beginCell()
			.store(
				storeChangeOwnerOfCollection({
					$$type: 'ChangeOwnerOfCollection',
					newOwner: params.newOwner,
				})
			)
			.endCell();
	},
};
