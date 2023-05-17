import { beginCell, contractAddress, Cell, Address } from 'ton-core';
import { Buffer } from 'buffer';
import { defaultsDeep } from 'lodash';

import { NftCollectionCodeCell } from './NftCollection.source';
import { NftItemCodeCell } from './../NftItem/NftItem.source';
import { SBTItemCodeCell } from './../SbtItem/SbtItem.source';
import { encodeOffChainContent } from './../utils/nft-content';
import { randomAddress } from './../utils';
import {
	NftCollectionData,
	MintBodyParams,
	ChangeOwnerBodyParams,
	GetRoyaltyParamsBodyParams,
	NftCollectionDataOptional,
	EditContentParams,
} from './../types';

import { NftCollectionOpcodes } from '../constants';

export function buildNftCollectionDataCell(data: NftCollectionData) {
	const dataCell = beginCell();

	dataCell.storeAddress(data.ownerAddress);
	dataCell.storeUint(data.nextItemIndex, 64);

	const contentCell = beginCell();

	const collectionContent = encodeOffChainContent(data.collectionContentUri);

	const commonContent = beginCell();
	commonContent.storeBuffer(Buffer.from(data.commonContent));

	contentCell.storeRef(collectionContent);
	contentCell.storeRef(commonContent);
	dataCell.storeRef(contentCell);

	dataCell.storeRef(data.nftItemCode);

	const royaltyCell = beginCell();

	royaltyCell.storeUint(data.royaltyParams.royaltyFactor, 16);
	royaltyCell.storeUint(data.royaltyParams.royaltyBase, 16);
	royaltyCell.storeAddress(data.royaltyParams.royaltyAddress);
	dataCell.storeRef(royaltyCell);

	const finishedCell = dataCell.endCell();
	return finishedCell;
}

export const getDefaultNftCollectionData = (
	source: NftCollectionDataOptional = {}
): NftCollectionData => {
	const OWNER_ADDRESS = randomAddress();
	const ROYALTY_ADDRESS = randomAddress();

	const defaultValue = {
		ownerAddress: OWNER_ADDRESS,
		nextItemIndex: 0,
		collectionContentUri: 'collection_content',
		commonContent: 'common_content',
		nftItemCode: source.isSoulbound ? SBTItemCodeCell : NftItemCodeCell,
		royaltyParams: {
			royaltyFactor: 100,
			royaltyBase: 200,
			royaltyAddress: ROYALTY_ADDRESS,
		},
	};

	const value = defaultsDeep(source, defaultValue);

	return value;
};

export function buildNftCollectionStateInit(
	conf: NftCollectionDataOptional,
	code: Cell = NftCollectionCodeCell
) {
	const nftCollectionData = getDefaultNftCollectionData(conf);
	const dataCell = buildNftCollectionDataCell(nftCollectionData);

	const stateInit = {
		code,
		data: dataCell,
	};

	const address = contractAddress(0, stateInit);

	return {
		stateInit,
		address,
	};
}

export const Queries = {
	mint: (params: MintBodyParams) => {
		const msgBody = beginCell();
		msgBody.storeUint(NftCollectionOpcodes.Mint, 32);
		msgBody.storeUint(params.queryId || 0, 64);
		msgBody.storeUint(params.itemIndex, 64);
		msgBody.storeCoins(params.amount);

		const itemContent = beginCell();
		itemContent.storeBuffer(Buffer.from(params.itemContent));
		const nftItemMessage = beginCell();

		nftItemMessage.storeAddress(params.itemOwnerAddress);
		nftItemMessage.storeRef(itemContent);

		msgBody.storeRef(nftItemMessage);

		return msgBody.endCell();
	},
	changeOwner: (params: ChangeOwnerBodyParams) => {
		const msgBody = beginCell();
		msgBody.storeUint(NftCollectionOpcodes.ChangeOwner, 32);
		msgBody.storeUint(params.queryId || 0, 64);
		msgBody.storeAddress(params.newOwnerAddress);

		return msgBody.endCell();
	},
	getRoyaltyParams: (params: GetRoyaltyParamsBodyParams) => {
		const msgBody = beginCell();
		msgBody.storeUint(NftCollectionOpcodes.GetRoyaltyParams, 32);
		msgBody.storeUint(params.queryId || 0, 64);

		return msgBody.endCell();
	},
	editContent: (params: EditContentParams) => {
		const msgBody = beginCell();
		msgBody.storeUint(NftCollectionOpcodes.EditContent, 32);
		msgBody.storeUint(params.queryId || 0, 64);

		const royaltyCell = beginCell();
		royaltyCell.storeUint(params.royaltyParams.royaltyFactor, 16);
		royaltyCell.storeUint(params.royaltyParams.royaltyBase, 16);
		royaltyCell.storeAddress(params.royaltyParams.royaltyAddress);

		const contentCell = beginCell();

		const collectionContent = encodeOffChainContent(params.collectionContentUri);

		const commonContent = encodeOffChainContent(params.commonContent);

		contentCell.storeRef(collectionContent);
		contentCell.storeRef(commonContent);

		msgBody.storeRef(contentCell);
		msgBody.storeRef(royaltyCell);

		return msgBody.endCell();
	},
};
