import {
  Address,
  toNano,
  beginCell,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
  TupleBuilder,
} from "ton-core";

import {
  GetRoyaltyParamsBodyParams,
  NftCollectionData,
  RoyaltyParams,
  BaseTransactionArgs,
  MintBodyParams,
  ChangeOwnerBodyParams,
  EditContentParams,
} from "../types";

import { Queries, buildNftCollectionDataCell } from "./helpers";
import { decodeOffChainContent } from "../../utils/nft-content";

const defaultCommandArgs: BaseTransactionArgs = {
  value: toNano("0.2"),
  sendMode: SendMode.PAY_GAS_SEPARATLY,
  bounce: false,
};

/*
 storage scheme
 default#_ royalty_factor:uint16 royalty_base:uint16 royalty_address:MsgAddress = RoyaltyParams;
 storage#_ owner_address:MsgAddress next_item_index:uint64
           ^[collection_content:^Cell common_content:^Cell]
           nft_item_code:^Cell
           royalty_params:^RoyaltyParams
           = Storage;
 */

export class NftCollection implements Contract {
  constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

  static createFromAddress(address: Address) {
    return new NftCollection(address);
  }

  static createFromConfig(configData: NftCollectionData, code: Cell, workchain = 0) {
    const data = buildNftCollectionDataCell(configData);
    const init = { code, data };

    return new NftCollection(contractAddress(workchain, init), init);
  }
  // Fix later
  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATLY,
      body: beginCell().endCell(),
    });
  }

  /* Commands */

  async sendEditContent(
    provider: ContractProvider,
    via: Sender,
    params: EditContentParams,
    args: BaseTransactionArgs = defaultCommandArgs
  ) {
    let msgBody = Queries.editContent(params);

    await provider.internal(via, {
      ...args,
      body: msgBody,
    });
  }

  async sendNewNftItem(
    provider: ContractProvider,
    via: Sender,
    params: MintBodyParams,
    args: BaseTransactionArgs = defaultCommandArgs
  ) {
    let msgBody = Queries.mint(params);

    await provider.internal(via, {
      ...args,
      body: msgBody,
    });
  }

  async sendChangeOwner(
    provider: ContractProvider,
    via: Sender,
    params: ChangeOwnerBodyParams,
    args: BaseTransactionArgs = defaultCommandArgs
  ) {
    let msgBody = Queries.changeOwner(params);

    await provider.internal(via, {
      ...args,
      body: msgBody,
    });
  }

  async sendGetRoyaltyParams(
    provider: ContractProvider,
    via: Sender,
    params: GetRoyaltyParamsBodyParams,
    args: BaseTransactionArgs = defaultCommandArgs
  ) {
    let msgBody = Queries.getRoyaltyParams(params);

    await provider.internal(via, {
      ...args,
      body: msgBody,
    });
  }
  /* Queries */

  async getCollectionData(provider: ContractProvider): Promise<{
    nextItemId: number;
    ownerAddress: Address;
    content: string;
  }> {
    const { stack } = await provider.get("get_collection_data", []);

    const nextItemId = stack.readNumber();
    const collectionContent = stack.readCell();
    const content = decodeOffChainContent(collectionContent);
    const ownerAddress = stack.readAddress();

    return {
      nextItemId,
      content,
      ownerAddress,
    };
  }

  async getNftAddressByIndex(provider: ContractProvider, index: number): Promise<Address> {
    let args = new TupleBuilder();

    args.writeNumber(index);

    let { stack } = await provider.get("get_nft_address_by_index", args.build());

    return stack.readAddress();
  }

  async getRoyaltyParams(provider: ContractProvider): Promise<RoyaltyParams> {
    let { stack } = await provider.get("royalty_params", []);

    const royaltyFactor = stack.readNumber();
    const royaltyBase = stack.readNumber();
    const royaltyAddress = stack.readAddress();

    return {
      royaltyFactor,
      royaltyBase,
      royaltyAddress,
    };
  }

  async getNftItemContent(provider: ContractProvider, index: number, individualContent: Cell) {
    let args = new TupleBuilder();

    args.writeNumber(index);
    args.writeCell(individualContent);

    let { stack } = await provider.get("get_nft_content", args.build());

    return decodeOffChainContent(stack.readCell());
  }
}
