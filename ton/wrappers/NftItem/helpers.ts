import { NftItemOpcodes } from "../constants";
import { Address, beginCell, contractAddress } from "ton-core";
import { encodeOffChainContent } from "../../utils/nft-content";
import { compile } from "@ton-community/blueprint";

import { GetStaticDataParams, NftItemData, NftInitItemData } from "./../types";

export function buildNftItemStateInitDataCell(data: NftInitItemData) {
  let dataCell = beginCell();

  dataCell.storeUint(data.itemIndex, 64);
  dataCell.storeAddress(data.collectionAddress);
  // dataCell.storeRef(contentCell);

  return dataCell.endCell();
}

export function buildNftItemInitilizedDataCell(data: NftItemData) {
  let dataCell = beginCell();

  const contentCell = encodeOffChainContent(data.content);

  dataCell.storeUint(data.itemIndex, 64);
  dataCell.storeAddress(data.collectionAddress);
  dataCell.storeAddress(data.ownerAddress);
  dataCell.storeRef(contentCell);

  return dataCell.endCell();
}

export async function buildNftItemStateInit(conf: NftInitItemData) {
  const dataCell = buildNftItemStateInitDataCell(conf);

  const NftItemSource = await compile("NftItem/NftItem");
  const stateInit = {
    code: NftItemSource,
    data: dataCell,
  };

  let address = contractAddress(0, stateInit);

  return {
    stateInit,
    address,
  };
}

export const Queries = {
  transfer: (params: { queryId?: number; newOwner: Address; responseTo?: Address; forwardAmount?: bigint }) => {
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
  composeInitContent: (content: string) => {
    const contentCell = beginCell().storeBuffer(Buffer.from(content)).endCell();

    return contentCell;
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
