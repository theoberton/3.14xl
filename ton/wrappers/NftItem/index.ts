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
} from "ton-core";
import { decodeOffChainContent } from "../../utils/nft-content";
import { BaseTransactionArgs, NftDataResponse, NftItemData } from "./../types";
import { Queries, buildNftItemInitilizedDataCell} from "./helpers";


const defaultCommandArgs: BaseTransactionArgs = {
  value: toNano("0.1"),
  sendMode: SendMode.PAY_GAS_SEPARATLY,
  bounce: false,
};

export class NftItem implements Contract {
  constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

  static createFromAddress(address: Address) {
    return new NftItem(address);
  }

  static createFromConfig(config: NftItemData, code: Cell, workchain = 0) {
    const data = buildNftItemInitilizedDataCell(config);
    const init = { code, data };

    return new NftItem(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATLY,
      body: beginCell().endCell(),
    });
  }

  /* Queries */

  async getData(provider: ContractProvider): Promise<NftDataResponse> {
    const { stack } = await provider.get("get_nft_data", []);
    const initializedStatus = stack.readNumber();
    const index = stack.readNumber();
    const collectionAddress = stack.readAddress();
    const ownerAddress = stack.readAddress();
    const content = stack.readCell();

    const isInitialized = initializedStatus === -1;

    if (!isInitialized) {
      return {
        isInitialized: false,
        index,
        collectionAddress,
      };
    }

    return {
      isInitialized: true,
      index,
      collectionAddress,
      ownerAddress,
      content: decodeOffChainContent(content),
      contentRaw: content,
    };
  }

  // async getEditor(provider: ContractProvider): Promise<Address | null> {
  //   const { stack } = await provider.get("get_editor", []);

  //   return stack.readAddress();
  // }

  // async getRoyaltyParams(provider: ContractProvider): Promise<RoyaltyParams | null> {
  //   const { stack } = await provider.get("royalty_params", []);

  //   return {
  //     royaltyFactor: stack.readNumber(),
  //     royaltyBase: stack.readNumber(),
  //     royaltyAddress: stack.readAddress(),
  //   };
  // }

  async sendTransfer(
    provider: ContractProvider,
    via: Sender,
    params: { queryId?: number; newOwner: Address; responseTo?: Address; forwardAmount?: bigint },
    args: BaseTransactionArgs = defaultCommandArgs
  ) {
    let msgBody = Queries.transfer(params);

    await provider.internal(via, {
      ...args,
      body: msgBody,
    });
  }

  async sendGetStaticData(provider: ContractProvider, via: Sender, args: BaseTransactionArgs = defaultCommandArgs) {
    let msgBody = Queries.getStaticData({});

    await provider.internal(via, {
      ...args,
      body: msgBody,
    });
  }

  // async sendEditContent(
  //   provider: ContractProvider,
  //   via: Sender,
  //   params: { queryId?: number; content: string; royaltyParams: RoyaltyParams },
  //   args: BaseTransactionArgs = defaultCommandArgs
  // ) {
  //   let msgBody = Queries.editContent(params);

  //   await provider.internal(via, {
  //     ...args,
  //     body: msgBody,
  //   });
  // }
}
