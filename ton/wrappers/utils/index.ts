import { NftCollectionData, NftCollectionDataOptional, NftItemData, NftItemDataOptional } from "../types";
import { NftItemCodeCell } from "../NftItem/NftItem.source";

import { Address } from "ton-core";
import { pseudoRandomBytes } from "crypto";

import _ from "lodash";


export function randomAddress() {
  return new Address(0, pseudoRandomBytes(256 / 8));
}

export const getDefaultNftCollectionData = (source: NftCollectionDataOptional = {}): NftCollectionData => {

  const OWNER_ADDRESS = randomAddress();
  const ROYALTY_ADDRESS = randomAddress();

  const defaultValue = {
    ownerAddress: OWNER_ADDRESS,
    nextItemIndex: 0,
    collectionContent: "collection_content",
    commonContent: "common_content",
    nftItemCode: NftItemCodeCell,
    royaltyParams: {
      royaltyFactor: 100,
      royaltyBase: 200,
      royaltyAddress: ROYALTY_ADDRESS,
    },
  };

  const value = _.defaultsDeep(source, defaultValue);

  return value;
};

export const getDefaultNftItemData = (source: NftItemDataOptional = {}): NftItemData => {
  const COLLECTION_ADDRESS = randomAddress();
  const OWNER_ADDRESS = randomAddress();

  const defaultValue = {
    itemIndex: 0,
    collectionAddress: COLLECTION_ADDRESS,
    ownerAddress: OWNER_ADDRESS,
    content: "test",
  };

  const value = _.defaultsDeep(source, defaultValue);

  return value;
};
