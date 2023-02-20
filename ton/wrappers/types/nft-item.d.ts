import { Contract, Address, Cell } from "ton-core";
import { RoyaltyParams } from "./nft-collection";


export interface NftInitItemData {
  itemIndex: number;
  collectionAddress: Address | null;
}

export interface NftItemData {
  itemIndex: number;
  collectionAddress: Address | null;
  ownerAddress: Address;
  content: string;
};

export interface NftItemDataOptional extends Partial<NftItemData> {}

export type NftDataResponse =
  | { isInitialized: false; index: number; collectionAddress: Address | null }
  | {
      isInitialized: true;
      index: number;
      collectionAddress: Address | null;
      ownerAddress: Address;
      content: string;
      contentRaw: Cell;
    };

export declare class NftItem implements Contract {
  readonly address: Address;
  constructor(address: Address, init?: { code: Cell; data: Cell });
  // Queries
  getData: () => Promise<NftDataResponse>;
  getEditor: () => Promise<Address | null>;
  getRoyaltyParams: () => Promise<RoyaltyParams | null>;
  // Commands
  sendTransfer: () => Promise<void>;
  sendGetStaticData: () => Promise<void>;
  sendGetRoyaltyParams: () => Promise<void>;
  sendEditContent: () => Promise<void>;
}
