import { Cell, Slice, Address, Builder, beginCell, ComputeError, TupleItem, TupleReader, Dictionary, contractAddress, ContractProvider, Sender, Contract, ContractABI, TupleBuilder, DictionaryValue } from 'ton-core';
import { ContractSystem, ContractExecutor } from 'ton-emulator';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

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
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}
export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}
export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}
export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}
export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}
export type Mint = {
    $$type: 'Mint';
    query_id: bigint;
    item_index: bigint;
    item_value: bigint;
    item_content: Cell;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.item_index, 64);
        b_0.storeCoins(src.item_value);
        b_0.storeRef(src.item_content);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _item_index = sc_0.loadUintBig(64);
    let _item_value = sc_0.loadCoins();
    let _item_content = sc_0.loadRef();
    return { $$type: 'Mint' as const, query_id: _query_id, item_index: _item_index, item_value: _item_value, item_content: _item_content };
}

function loadTupleMint(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _item_index = source.readBigNumber();
    let _item_value = source.readBigNumber();
    let _item_content = source.readCell();
    return { $$type: 'Mint' as const, query_id: _query_id, item_index: _item_index, item_value: _item_value, item_content: _item_content };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.item_index);
    builder.writeNumber(source.item_value);
    builder.writeCell(source.item_content);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}
export type MintSafe = {
    $$type: 'MintSafe';
    query_id: bigint;
    next_item_index: bigint;
    item_owner: Address;
}

export function storeMintSafe(src: MintSafe) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3323304562, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.next_item_index, 64);
        b_0.storeAddress(src.item_owner);
    };
}

export function loadMintSafe(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3323304562) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _next_item_index = sc_0.loadUintBig(64);
    let _item_owner = sc_0.loadAddress();
    return { $$type: 'MintSafe' as const, query_id: _query_id, next_item_index: _next_item_index, item_owner: _item_owner };
}

function loadTupleMintSafe(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _next_item_index = source.readBigNumber();
    let _item_owner = source.readAddress();
    return { $$type: 'MintSafe' as const, query_id: _query_id, next_item_index: _next_item_index, item_owner: _item_owner };
}

function storeTupleMintSafe(source: MintSafe) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.next_item_index);
    builder.writeAddress(source.item_owner);
    return builder.build();
}

function dictValueParserMintSafe(): DictionaryValue<MintSafe> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMintSafe(src)).endCell());
        },
        parse: (src) => {
            return loadMintSafe(src.loadRef().beginParse());
        }
    }
}
export type SetNftCollectionAddress = {
    $$type: 'SetNftCollectionAddress';
    nft_collection_address: Address;
}

export function storeSetNftCollectionAddress(src: SetNftCollectionAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(435957060, 32);
        b_0.storeAddress(src.nft_collection_address);
    };
}

export function loadSetNftCollectionAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 435957060) { throw Error('Invalid prefix'); }
    let _nft_collection_address = sc_0.loadAddress();
    return { $$type: 'SetNftCollectionAddress' as const, nft_collection_address: _nft_collection_address };
}

function loadTupleSetNftCollectionAddress(source: TupleReader) {
    let _nft_collection_address = source.readAddress();
    return { $$type: 'SetNftCollectionAddress' as const, nft_collection_address: _nft_collection_address };
}

function storeTupleSetNftCollectionAddress(source: SetNftCollectionAddress) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.nft_collection_address);
    return builder.build();
}

function dictValueParserSetNftCollectionAddress(): DictionaryValue<SetNftCollectionAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetNftCollectionAddress(src)).endCell());
        },
        parse: (src) => {
            return loadSetNftCollectionAddress(src.loadRef().beginParse());
        }
    }
}
export type ManagerData = {
    $$type: 'ManagerData';
    owner: Address;
    debug: bigint;
    nft_collection_address: Address;
    mint_price: bigint;
    max_supply: bigint;
    mint_date_start: bigint;
    mint_date_end: bigint;
}

export function storeManagerData(src: ManagerData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.debug, 16);
        b_0.storeAddress(src.nft_collection_address);
        b_0.storeCoins(src.mint_price);
        b_0.storeUint(src.max_supply, 32);
        b_0.storeUint(src.mint_date_start, 32);
        b_0.storeUint(src.mint_date_end, 32);
    };
}

export function loadManagerData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _debug = sc_0.loadUintBig(16);
    let _nft_collection_address = sc_0.loadAddress();
    let _mint_price = sc_0.loadCoins();
    let _max_supply = sc_0.loadUintBig(32);
    let _mint_date_start = sc_0.loadUintBig(32);
    let _mint_date_end = sc_0.loadUintBig(32);
    return { $$type: 'ManagerData' as const, owner: _owner, debug: _debug, nft_collection_address: _nft_collection_address, mint_price: _mint_price, max_supply: _max_supply, mint_date_start: _mint_date_start, mint_date_end: _mint_date_end };
}

function loadTupleManagerData(source: TupleReader) {
    let _owner = source.readAddress();
    let _debug = source.readBigNumber();
    let _nft_collection_address = source.readAddress();
    let _mint_price = source.readBigNumber();
    let _max_supply = source.readBigNumber();
    let _mint_date_start = source.readBigNumber();
    let _mint_date_end = source.readBigNumber();
    return { $$type: 'ManagerData' as const, owner: _owner, debug: _debug, nft_collection_address: _nft_collection_address, mint_price: _mint_price, max_supply: _max_supply, mint_date_start: _mint_date_start, mint_date_end: _mint_date_end };
}

function storeTupleManagerData(source: ManagerData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.debug);
    builder.writeAddress(source.nft_collection_address);
    builder.writeNumber(source.mint_price);
    builder.writeNumber(source.max_supply);
    builder.writeNumber(source.mint_date_start);
    builder.writeNumber(source.mint_date_end);
    return builder.build();
}

function dictValueParserManagerData(): DictionaryValue<ManagerData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeManagerData(src)).endCell());
        },
        parse: (src) => {
            return loadManagerData(src.loadRef().beginParse());
        }
    }
}
async function NftManager_init(owner: Address, debug: bigint, mint_price: bigint, max_supply: bigint, mint_date_start: bigint, mint_date_end: bigint) {
    const __init = 'te6ccgEBBgEAQQABFP8A9KQT9LzyyAsBAgFiAgMCAs0EBQAJoUrd4A0AAdQAO2iUHyMwHBlUwUHbPFhTLD1jPFgH6AssfEssfyx/Jg==';
    const __code = 'te6ccgECHgEABJgAART/APSkE/S88sgLAQIBYgIDAgLOBAUCASAWFwOVRwIddJwh+VMCDXCx/eAtDTAwFxsMABkX+RcOIB+kAiUGZvBPhhApFb4CCCEBn8LUS64wIgghDGFZpyuuMCghCUapi2uuMCMPLAgoBgcIAElI0IYALSI332fmrU+mQPNJxkwFa/rnK28Q5/xRqOdyEAlZqKjIAdow7UTQ1AH4YvpAAQHTD/pAAQH6ANMf0x/TH1VgbBcH0x8BghAZ/C1EuvLggfpAATEQZxBWEEUQNEEwVWDbPCaCAJrCBscFFfL0EFYQRVUCyPhCAcxVYFB2zxYUyw9YzxYB+gLLHxLLH8sfye1UCQHGMO1E0NQB+GL6QAEB0w/6QAEB+gDTH9Mf0x9VYGwXB9MfAYIQxhWacrry4IHTP9M/+kABQzAzEIkQeBBnEFYQRRA0WNs8yPhCAcxVYFB2zxYUyw9YzxYB+gLLHxLLH8sfye1UCgK27UTQ1AH4YvpAAQHTD/pAAQH6ANMf0x/TH1VgbBcH0x8BghCUapi2uvLggdM/ATEQZxBWEEUQNEEw2zzbPMj4QgHMVWBQds8WFMsPWM8WAfoCyx8Syx/LH8ntVBITABz4QW8kECNfAyfHBfLghATY+EFvJDAxyDICzxbbPAHMyYE1aiiCEAvrwgCgE74S8vQlwgCZggC6YlMmufL03oFcpCX4I7ny9IIAjMAkwAAl+CO8sfL0f3GL9ORlQgaXRlbSBtaW50ZWSNs8bW0uUUxENNs8f/ACKIAUqQRxCw4UDAAEyMkELonbPG1t2zx/ggr68IBQQ3GCCTEtAFAEDQ4UDwAeTkZUIGl0ZW0gbWludGVkAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DEQAhLbPChVIG1t2zwRFAC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DACTIVTBxUAXLHxPLP8s/AfoCzMkAHMgBghCv+Q9XWMsfyz/JAST4QW8kECNfA38CcIBCWG1t2zwUAfbIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GOTH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrMVADCcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wACASAYGQBxvd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4IGc6tPOK/OkoWA6wtxMj2UAUO6re7UTQ1AH4YvpAAQHTD/pAAQH6ANMf0x/TH1VgbBfbPIGgIBIBscAAgQRl8GAUO0o72omhqAPwxfSAAgOmH/SAAgP0AaY/pj+mPqrA2C+2eQHQA/tQzdqJoagD8MX0gAIDph/0gAID9AGmP6Y/pj6qwNgvAABF8G';
    const __system = 'te6cckECIAEABKIAAQHAAQEFoG0/AgEU/wD0pBP0vPLICwMCAWINBAIBIAYFAHG93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTggZzq084r86ShYDrC3EyPZQCASALBwIBIAkIAD+1DN2omhqAPwxfSAAgOmH/SAAgP0AaY/pj+mPqrA2C8AFDtKO9qJoagD8MX0gAIDph/0gAID9AGmP6Y/pj6qwNgvtnkAoABF8GAUO6re7UTQ1AH4YvpAAQHTD/pAAQH6ANMf0x/TH1VgbBfbPIDAAIEEZfBgICzg8OAElI0IYALSI332fmrU+mQPNJxkwFa/rnK28Q5/xRqOdyEAlZqKjIA5VHAh10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QCJQZm8E+GECkVvgIIIQGfwtRLrjAiCCEMYVmnK64wKCEJRqmLa64wIw8sCCgeExACtu1E0NQB+GL6QAEB0w/6QAEB+gDTH9Mf0x9VYGwXB9MfAYIQlGqYtrry4IHTPwExEGcQVhBFEDRBMNs82zzI+EIBzFVgUHbPFhTLD1jPFgH6AssfEssfyx/J7VQSEQEk+EFvJBAjXwN/AnCAQlhtbds8GQAcyAGCEK/5D1dYyx/LP8kBxjDtRNDUAfhi+kABAdMP+kABAfoA0x/TH9MfVWBsFwfTHwGCEMYVmnK68uCB0z/TP/pAAUMwMxCJEHgQZxBWEEUQNFjbPMj4QgHMVWBQds8WFMsPWM8WAfoCyx8Syx/LH8ntVBQE2PhBbyQwMcgyAs8W2zwBzMmBNWooghAL68IAoBO+EvL0JcIAmYIAumJTJrny9N6BXKQl+CO58vSCAIzAJMAAJfgjvLHy9H9xi/TkZUIGl0ZW0gbWludGVkjbPG1tLlFMRDTbPH/wAiiAFKkEcR0bGRUELonbPG1t2zx/ggr68IBQQ3GCCTEtAFAEGBsZFgIS2zwoVSBtbds8FxkAJMhVMHFQBcsfE8s/yz8B+gLMyQAeTkZUIGl0ZW0gbWludGVkAfbIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GOTH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrMaADCcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wABQshwAcsfbwABb4xtb4wB2zxvIgHJkyFus5YBbyJZzMnoMRwAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwAEyMkB2jDtRNDUAfhi+kABAdMP+kABAfoA0x/TH9MfVWBsFwfTHwGCEBn8LUS68uCB+kABMRBnEFYQRRA0QTBVYNs8JoIAmsIGxwUV8vQQVhBFVQLI+EIBzFVgUHbPFhTLD1jPFgH6AssfEssfyx/J7VQfABz4QW8kECNfAyfHBfLghBF4904=';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    builder.writeAddress(owner);
    builder.writeNumber(debug);
    builder.writeNumber(mint_price);
    builder.writeNumber(max_supply);
    builder.writeNumber(mint_date_start);
    builder.writeNumber(mint_date_end);
    let __stack = builder.build();
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let initCell = Cell.fromBoc(Buffer.from(__init, 'base64'))[0];
    let system = await ContractSystem.create();
    let executor = await ContractExecutor.create({ code: initCell, data: new Cell() }, system);
    let res = await executor.get('init', __stack);
    if (!res.success) { throw Error(res.error); }
    if (res.exitCode !== 0 && res.exitCode !== 1) {
        if (NftManager_errors[res.exitCode]) {
            throw new ComputeError(NftManager_errors[res.exitCode].message, res.exitCode, { logs: res.logs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.logs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const NftManager_errors: { [key: number]: { message: string } } = {
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
    13674: { message: `Insufficient amount sent` },
    23716: { message: `Minting has not started yet` },
    36032: { message: `Minting has finished` },
    39618: { message: `NFT Manager Already Initialized` },
    47714: { message: `Max supply reached` },
}

export class NftManager implements Contract {
    
    static async init(owner: Address, debug: bigint, mint_price: bigint, max_supply: bigint, mint_date_start: bigint, mint_date_end: bigint) {
        return await NftManager_init(owner,debug,mint_price,max_supply,mint_date_start,mint_date_end);
    }
    
    static async fromInit(owner: Address, debug: bigint, mint_price: bigint, max_supply: bigint, mint_date_start: bigint, mint_date_end: bigint) {
        const init = await NftManager_init(owner,debug,mint_price,max_supply,mint_date_start,mint_date_end);
        const address = contractAddress(0, init);
        return new NftManager(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftManager(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: NftManager_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetNftCollectionAddress | MintSafe | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetNftCollectionAddress') {
            body = beginCell().store(storeSetNftCollectionAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintSafe') {
            body = beginCell().store(storeMintSafe(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getNftCollectionAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('nft_collection_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetManagerData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_manager_data', builder.build())).stack;
        const result = loadTupleManagerData(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}