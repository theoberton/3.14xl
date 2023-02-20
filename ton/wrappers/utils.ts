import { NftCollectionData, NftCollectionDataOptional, NftItemData, NftItemDataOptional } from "./types";
import { NftItemCodeCell } from "./NftItem/NftItem.source";
import { randomAddress } from "../utils/randomAddress";
import _ from "lodash";

const OWNER_ADDRESS = randomAddress();
const ROYALTY_ADDRESS = randomAddress();
const COLLECTION_ADDRESS = randomAddress();

export const getDefaultNftCollectionData = (source: NftCollectionDataOptional = {}): NftCollectionData => {
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
  const defaultValue = {
    itemIndex: 0,
    collectionAddress: COLLECTION_ADDRESS,
    ownerAddress: OWNER_ADDRESS,
    content: "test",
  };

  const value = _.defaultsDeep(source, defaultValue);

  return value;
};
