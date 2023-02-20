import { Address, Cell, beginCell, contractAddress } from "ton-core";
import { NftItemCodeCell, NftSingleCodeCell } from "./NftItem.source";
import bigint from "bigint.js";
import { encodeOffChainContent } from "../../nft-content/nftContent";
import { Queries as CollectionQueries } from "../nft-collection/NftCollection.data";

export type NftItemData = {
  index: number;
  collectionAddress: Address | null;
  ownerAddress: Address;
  content: string;
};

export function buildNftItemDataCell(data: NftItemData) {
  let dataCell = beginCell();

  let contentCell = beginCell();
  contentCell.storeBuffer(Buffer.from(data.content));

  dataCell.storeUint(data.index, 64);
  dataCell.storeAddress(data.collectionAddress);
  dataCell.storeAddress(data.ownerAddress);
  dataCell.storeRef(contentCell);

  return dataCell;
}

export function buildNftItemDeployMessage(conf: {
  queryId?: number;
  collectionAddress: Address;
  passAmount: bigint;
  itemIndex: number;
  itemOwnerAddress: Address;
  itemContent: string;
}) {
  let msgBody = CollectionQueries.mint(conf);

  return {
    messageBody: msgBody,
    collectionAddress: conf.collectionAddress,
  };
}

export type RoyaltyParams = {
  // numerator
  royaltyFactor: number;
  // denominator
  royaltyBase: number;
  royaltyAddress: Address;
};

export type NftItemData = {
  ownerAddress: Address;
  editorAddress: Address;
  content: string;
  royaltyParams: RoyaltyParams;
};

export function buildSingleNftDataCell(data: NftItemData) {
  let dataCell = beginCell();

  let contentCell = encodeOffChainContent(data.content);

  let royaltyCell = beginCell();
  royaltyCell.storeUint(data.royaltyParams.royaltyFactor, 16);
  royaltyCell.storeUint(data.royaltyParams.royaltyBase, 16);
  royaltyCell.storeAddress(data.royaltyParams.royaltyAddress);

  dataCell.storeAddress(data.ownerAddress);
  dataCell.storeAddress(data.editorAddress);
  dataCell.storeRef(contentCell);
  dataCell.storeRef(royaltyCell);

  return dataCell;
}

export function buildSingleNftStateInit(conf: NftItemData) {
  let dataCell = buildSingleNftDataCell(conf);

  let stateInit = new StateInit({
    code: NftSingleCodeCell,
    data: dataCell,
  });

  let stateInitCell = beginCell();
  stateInit.writeTo(stateInitCell);

  let address = contractAddress({ workchain: 0, initialCode: NftSingleCodeCell, initialData: dataCell });

  return {
    stateInit: stateInitCell,
    stateInitMessage: stateInit,
    address,
  };
}

export const OperationCodes = {
  transfer: 0x5fcc3d14,
  getStaticData: 0x2fcb26a2,
  getStaticDataResponse: 0x8b771735,
  GetRoyaltyParams: 0x693d3950,
  GetRoyaltyParamsResponse: 0xa8cb00ad,
  EditContent: 0x1a0b9d51,
  TransferEditorship: 0x1c04412a,
};
