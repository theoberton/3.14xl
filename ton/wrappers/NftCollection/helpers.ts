import { StateInit, beginCell, contractAddress } from "ton-core";
import { NftCollectionCodeCell } from "./NftCollection.source";
import { encodeOffChainContent } from "../../utils/nft-content";
import {
  NftCollectionData,
  MintBodyParams,
  ChangeOwnerBodyParams,
  GetRoyaltyParamsBodyParams,
  EditContentParams,
} from "./../types";
import { NftCollectionOpcodes } from "../constants";


export function buildNftCollectionDataCell(data: NftCollectionData) {
  let dataCell = beginCell();

  dataCell.storeAddress(data.ownerAddress);
  dataCell.storeUint(data.nextItemIndex, 64);

  let contentCell = beginCell();

  let collectionContent = encodeOffChainContent(data.collectionContent);

  let commonContent = beginCell();
  commonContent.storeBuffer(Buffer.from(data.commonContent));

  contentCell.storeRef(collectionContent);
  contentCell.storeRef(commonContent);
  dataCell.storeRef(contentCell);

  dataCell.storeRef(data.nftItemCode);

  let royaltyCell = beginCell();

  royaltyCell.storeUint(data.royaltyParams.royaltyFactor, 16);
  royaltyCell.storeUint(data.royaltyParams.royaltyBase, 16);
  royaltyCell.storeAddress(data.royaltyParams.royaltyAddress);
  dataCell.storeRef(royaltyCell);

  return dataCell.endCell();
}

export function buildNftCollectionStateInit(conf: NftCollectionData) {
  const dataCell = buildNftCollectionDataCell(conf);

  const stateInit: StateInit = {
    code: NftCollectionCodeCell,
    data: dataCell,
  };

  return stateInit;
}

export const Queries = {
  mint: (params: MintBodyParams) => {
    let msgBody = beginCell();
    msgBody.storeUint(NftCollectionOpcodes.Mint, 32);
    msgBody.storeUint(params.queryId || 0, 64);
    msgBody.storeUint(params.itemIndex, 64);
    msgBody.storeCoins(params.amount);

    let itemContent = beginCell();
    itemContent.storeBuffer(Buffer.from(params.itemContent));
    let nftItemMessage = beginCell();

    nftItemMessage.storeAddress(params.itemOwnerAddress);
    nftItemMessage.storeRef(itemContent);

    msgBody.storeRef(nftItemMessage);

    return msgBody.endCell();
  },
  changeOwner: (params: ChangeOwnerBodyParams) => {
    let msgBody = beginCell();
    msgBody.storeUint(NftCollectionOpcodes.ChangeOwner, 32);
    msgBody.storeUint(params.queryId || 0, 64);
    msgBody.storeAddress(params.newOwnerAddress);

    return msgBody.endCell();
  },
  getRoyaltyParams: (params: GetRoyaltyParamsBodyParams) => {
    let msgBody = beginCell();
    msgBody.storeUint(NftCollectionOpcodes.GetRoyaltyParams, 32);
    msgBody.storeUint(params.queryId || 0, 64);

    return msgBody.endCell();
  },
  editContent: (params: EditContentParams) => {
    let msgBody = beginCell();
    msgBody.storeUint(NftCollectionOpcodes.EditContent, 32);
    msgBody.storeUint(params.queryId || 0, 64);

    let royaltyCell = beginCell();
    royaltyCell.storeUint(params.royaltyParams.royaltyFactor, 16);
    royaltyCell.storeUint(params.royaltyParams.royaltyBase, 16);
    royaltyCell.storeAddress(params.royaltyParams.royaltyAddress);

    let contentCell = beginCell();

    let collectionContent = encodeOffChainContent(params.collectionContent);

    let commonContent = beginCell();
    commonContent.storeBuffer(Buffer.from(params.commonContent));

    contentCell.storeRef(collectionContent);
    contentCell.storeRef(commonContent);

    msgBody.storeRef(contentCell);
    msgBody.storeRef(royaltyCell);

    return msgBody.endCell();
  },
};
