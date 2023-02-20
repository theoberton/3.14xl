import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  TupleBuilder,
  DictionaryValue,
} from "ton-core";
import { ContractSystem, ContractExecutor } from "ton-emulator";
import { compileFunc, compilerVersion } from "@ton-community/func-js";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

async function NftItem_init(collectionAddress: Address, index: bigint) {
  const __init = "te6ccgEBBgEAOgABFP8A9KQT9LzyyAsBAgFiAgMCAs0EBQAJoUrd4AkAAdQALdGDa2toJkZgIoIeeLQICA54AsZ4tmZM";
  const __code =
    "te6ccgEBDQEA8QABFP8A9KQT9LzyyAsBAgFiAgMARtAg10kxwh8w0NMDAXGwwAGRf5Fw4gH6QCJQRG8E+GHc8sCCAgEgBAUBO74o72omhqAPwxfSAAgMCAgOuAfSAAgOoqmDYKbZ5AYCASAHCAAGE18DAHG7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnBAznVp5xX50lCwHWFuJkeygCASAJCgE7tTvdqJoagD8MX0gAIDAgIDrgH0gAIDqKpg2Cm2eQCwE7thOdqJoagD8MX0gAIDAgIDrgH0gAIDqKpg2Cm2eQDAAEbDEABF8D";
  const __system =
    "te6cckEBDwEA+wABAcABAQWg89UCART/APSkE/S88sgLAwIBYg4EAgEgDAUCASALBgIBIAkHATu2E52omhqAPwxfSAAgMCAgOuAfSAAgOoqmDYKbZ5AIAARfAwE7tTvdqJoagD8MX0gAIDAgIDrgH0gAIDqKpg2Cm2eQCgAEbDEAcbu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcEDOdWnnFfnSULAdYW4mR7KAE7vijvaiaGoA/DF9IACAwICA64B9IACA6iqYNgptnkDQAGE18DAEbQINdJMcIfMNDTAwFxsMABkX+RcOIB+kAiUERvBPhh3PLAgsP8Gng=";
  let systemCell = Cell.fromBase64(__system);
  let builder = new TupleBuilder();
  builder.writeCell(systemCell);
  builder.writeAddress(collectionAddress);
  builder.writeNumber(index);
  let __stack = builder.build();
  let codeCell = Cell.fromBoc(Buffer.from(__code, "base64"))[0];
  let initCell = Cell.fromBoc(Buffer.from(__init, "base64"))[0];
  let system = await ContractSystem.create();
  let executor = await ContractExecutor.create({ code: initCell, data: new Cell() }, system);
  let res = await executor.get("init", __stack);
  if (!res.success) {
    throw Error(res.error);
  }
  if (res.exitCode !== 0 && res.exitCode !== 1) {
    if (NftItem_errors[res.exitCode]) {
      throw new ComputeError(NftItem_errors[res.exitCode].message, res.exitCode, { logs: res.logs });
    } else {
      throw new ComputeError("Exit code: " + res.exitCode, res.exitCode, { logs: res.logs });
    }
  }

  let data = res.stack.readCell();
  return { code: codeCell, data };
}

const NftItem_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
};

export class NftItem implements Contract {
  static async init(collectionAddress: Address, index: bigint) {
    return await NftItem_init(collectionAddress, index);
  }

  static async fromInit(collectionAddress: Address, index: bigint) {
    const init = await NftItem_init(collectionAddress, index);
    const address = contractAddress(0, init);
    return new NftItem(address, init);
  }

  static fromAddress(address: Address) {
    return new NftItem(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    errors: NftItem_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async getCollectionAddress(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("collection_address", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getContent(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("content", builder.build())).stack;
    let result = source.readCell();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("owner", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }
}
