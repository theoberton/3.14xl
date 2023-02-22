import _ from 'lodash';

import { NftItemOpcodes } from '../constants';
import { Address, beginCell, contractAddress, Cell } from 'ton-core';
import { encodeOffChainContent } from './../utils/nft-content';
import { randomAddress } from './../utils';
import { defaultsDeep } from 'lodash';
import { Buffer } from 'buffer';

import { GetStaticDataParams, NftItemDataOptional, NftItemData, NftInitItemData } from './../types';
import { NftItemCodeCell } from './NftItem.source';

export function buildNftItemStateInitDataCell(data: NftInitItemData) {
	let dataCell = beginCell();

	dataCell.storeUint(data.itemIndex, 64);
	dataCell.storeAddress(data.collectionAddress);
	// dataCell.storeRef(contentCell);

	return dataCell.endCell();
}

export const getDefaultNftItemData = (source: NftItemDataOptional = {}): NftItemData => {
	const COLLECTION_ADDRESS = randomAddress();
	const OWNER_ADDRESS = randomAddress();

	const defaultValue = {
		itemIndex: 0,
		collectionAddress: COLLECTION_ADDRESS,
		ownerAddress: OWNER_ADDRESS,
		content: 'test',
	};

	const value = defaultsDeep(source, defaultValue);

	return value;
};

export function buildNftItemInitilizedDataCell(data: NftItemData) {}

export function buildNftItemStateInit(conf: NftItemDataOptional, code: Cell = NftItemCodeCell) {
	const nftItemData = getDefaultNftItemData(conf);
	const dataCell = buildNftItemStateInitDataCell(nftItemData);

	const stateInit = {
		code: code,
		data: dataCell,
	};

	let address = contractAddress(0, stateInit);

	return {
		stateInit,
		address,
	};
}

export const Queries = {
	transfer: (params: {
		queryId?: number;
		newOwner: Address;
		responseTo?: Address;
		forwardAmount?: bigint;
	}) => {
		let msgBody = beginCell();

		msgBody.storeUint(NftItemOpcodes.Transfer, 32);
		msgBody.storeUint(params.queryId || 0, 64);
		msgBody.storeAddress(params.newOwner);
		msgBody.storeAddress(params.responseTo || null);
		msgBody.storeBit(false); // no custom payload
		msgBody.storeCoins(params.forwardAmount || 0);
		msgBody.storeBit(0); // no forward_payload yet

		return msgBody.endCell();
	},
	composeInitMessage: (params: NftItemData) => {
		let dataCell = beginCell();

		const contentCell = encodeOffChainContent(params.content);

		dataCell.storeAddress(params.ownerAddress);
		dataCell.storeRef(contentCell);

		return dataCell.endCell();
	},
	getStaticData: (params: GetStaticDataParams) => {
		let msgBody = beginCell();
		msgBody.storeUint(NftItemOpcodes.GetStaticData, 32);
		msgBody.storeUint(params.queryId || 0, 64);

		return msgBody.endCell();
	},
	// leave this method when/if nft-item editable will be used
	// transferEditorship: (params: TransferEditorshipParams) => {
	//   let msgBody = beginCell();
	//   msgBody.storeUint(NftItemOpcodes.TransferEditorship, 32);
	//   msgBody.storeUint(params.queryId || 0, 64);
	//   msgBody.storeAddress(params.newEditor);
	//   msgBody.storeAddress(params.responseTo || null);
	//   msgBody.storeBit(false); // no custom payload
	//   msgBody.storeCoins(params.forwardAmount || 0);
	//   msgBody.storeBit(0); // no forward_payload yet

	//   return msgBody;
	// },
};
