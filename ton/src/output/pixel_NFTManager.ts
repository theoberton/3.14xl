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
export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    royalty_factor: bigint;
    roaylty_base: bigint;
    roaylty_address: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.royalty_factor, 16);
        b_0.storeUint(src.roaylty_base, 16);
        b_0.storeAddress(src.roaylty_address);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _royalty_factor = sc_0.loadUintBig(16);
    let _roaylty_base = sc_0.loadUintBig(16);
    let _roaylty_address = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, royalty_factor: _royalty_factor, roaylty_base: _roaylty_base, roaylty_address: _roaylty_address };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _royalty_factor = source.readBigNumber();
    let _roaylty_base = source.readBigNumber();
    let _roaylty_address = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, royalty_factor: _royalty_factor, roaylty_base: _roaylty_base, roaylty_address: _roaylty_address };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.royalty_factor);
    builder.writeNumber(source.roaylty_base);
    builder.writeAddress(source.roaylty_address);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}
export type CollectionInitData = {
    $$type: 'CollectionInitData';
    owner: Address;
    next_item_index: bigint;
    content: Cell;
    nft_item_code: Cell;
    royalty: RoyaltyParams;
}

export function storeCollectionInitData(src: CollectionInitData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.next_item_index, 64);
        b_0.storeRef(src.content);
        b_0.storeRef(src.nft_item_code);
        b_0.store(storeRoyaltyParams(src.royalty));
    };
}

export function loadCollectionInitData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _next_item_index = sc_0.loadUintBig(64);
    let _content = sc_0.loadRef();
    let _nft_item_code = sc_0.loadRef();
    let _royalty = loadRoyaltyParams(sc_0);
    return { $$type: 'CollectionInitData' as const, owner: _owner, next_item_index: _next_item_index, content: _content, nft_item_code: _nft_item_code, royalty: _royalty };
}

function loadTupleCollectionInitData(source: TupleReader) {
    let _owner = source.readAddress();
    let _next_item_index = source.readBigNumber();
    let _content = source.readCell();
    let _nft_item_code = source.readCell();
    const _royalty = loadTupleRoyaltyParams(source.readTuple());
    return { $$type: 'CollectionInitData' as const, owner: _owner, next_item_index: _next_item_index, content: _content, nft_item_code: _nft_item_code, royalty: _royalty };
}

function storeTupleCollectionInitData(source: CollectionInitData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.content);
    builder.writeCell(source.nft_item_code);
    builder.writeTuple(storeTupleRoyaltyParams(source.royalty));
    return builder.build();
}

function dictValueParserCollectionInitData(): DictionaryValue<CollectionInitData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionInitData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionInitData(src.loadRef().beginParse());
        }
    }
}
export type DeployNftCollection = {
    $$type: 'DeployNftCollection';
    content: Cell;
    nft_item_code: Cell;
    nft_collection_code: Cell;
    royalty: RoyaltyParams;
}

export function storeDeployNftCollection(src: DeployNftCollection) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(958432173, 32);
        b_0.storeRef(src.content);
        b_0.storeRef(src.nft_item_code);
        b_0.storeRef(src.nft_collection_code);
        b_0.store(storeRoyaltyParams(src.royalty));
    };
}

export function loadDeployNftCollection(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 958432173) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    let _nft_item_code = sc_0.loadRef();
    let _nft_collection_code = sc_0.loadRef();
    let _royalty = loadRoyaltyParams(sc_0);
    return { $$type: 'DeployNftCollection' as const, content: _content, nft_item_code: _nft_item_code, nft_collection_code: _nft_collection_code, royalty: _royalty };
}

function loadTupleDeployNftCollection(source: TupleReader) {
    let _content = source.readCell();
    let _nft_item_code = source.readCell();
    let _nft_collection_code = source.readCell();
    const _royalty = loadTupleRoyaltyParams(source.readTuple());
    return { $$type: 'DeployNftCollection' as const, content: _content, nft_item_code: _nft_item_code, nft_collection_code: _nft_collection_code, royalty: _royalty };
}

function storeTupleDeployNftCollection(source: DeployNftCollection) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    builder.writeCell(source.nft_item_code);
    builder.writeCell(source.nft_collection_code);
    builder.writeTuple(storeTupleRoyaltyParams(source.royalty));
    return builder.build();
}

function dictValueParserDeployNftCollection(): DictionaryValue<DeployNftCollection> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployNftCollection(src)).endCell());
        },
        parse: (src) => {
            return loadDeployNftCollection(src.loadRef().beginParse());
        }
    }
}
export type ItemContent = {
    $$type: 'ItemContent';
    owner: Address;
    content: Cell;
}

export function storeItemContent(src: ItemContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

export function loadItemContent(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    return { $$type: 'ItemContent' as const, owner: _owner, content: _content };
}

function loadTupleItemContent(source: TupleReader) {
    let _owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'ItemContent' as const, owner: _owner, content: _content };
}

function storeTupleItemContent(source: ItemContent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserItemContent(): DictionaryValue<ItemContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeItemContent(src)).endCell());
        },
        parse: (src) => {
            return loadItemContent(src.loadRef().beginParse());
        }
    }
}
export type Mint = {
    $$type: 'Mint';
    query_id: bigint;
    item_index: bigint;
    amount: bigint;
    item_content: ItemContent;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.item_index, 64);
        b_0.storeCoins(src.amount);
        b_0.store(storeItemContent(src.item_content));
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _item_index = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _item_content = loadItemContent(sc_0);
    return { $$type: 'Mint' as const, query_id: _query_id, item_index: _item_index, amount: _amount, item_content: _item_content };
}

function loadTupleMint(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _item_index = source.readBigNumber();
    let _amount = source.readBigNumber();
    const _item_content = loadTupleItemContent(source.readTuple());
    return { $$type: 'Mint' as const, query_id: _query_id, item_index: _item_index, amount: _amount, item_content: _item_content };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.item_index);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTupleItemContent(source.item_content));
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
}

export function storeMintSafe(src: MintSafe) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(192132677, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.next_item_index, 64);
    };
}

export function loadMintSafe(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 192132677) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _next_item_index = sc_0.loadUintBig(64);
    return { $$type: 'MintSafe' as const, query_id: _query_id, next_item_index: _next_item_index };
}

function loadTupleMintSafe(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _next_item_index = source.readBigNumber();
    return { $$type: 'MintSafe' as const, query_id: _query_id, next_item_index: _next_item_index };
}

function storeTupleMintSafe(source: MintSafe) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.next_item_index);
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
async function NftManager_init(owner: Address, content: Cell) {
    const __init = 'te6ccgEBBgEAMgABFP8A9KQT9LzyyAsBAgFiAgMCAs0EBQAJoUrd4AkAAdQAHdNoHkZigZrWeLLGeLZmTA==';
    const __code = 'te6ccgECFgEAAxQAART/APSkE/S88sgLAQIBYgIDA5bQcCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAIlBmbwT4YQKRW+AgghA5IIOtuuMCIIIQC3O2RbrjAoIQlGqYtrrjAjDywIIEBQYCASAQEQO8MO1E0NQB+GL6QAEB+kABAdRVIGwTA9MfAYIQOSCDrbry4IHU1NTTD9MP+kABQzAQNhA1EDQ2EHgQZ1UE2zxc2zxwcFBCgEBQQm0C2zzI+EIBzFUgWs8WWM8WzMntVAcIDgO4MO1E0NQB+GL6QAEB+kABAdRVIGwTA9MfAYIQC3O2Rbry4IHTP9M/WTIQNEMA+EFvJBAjXwNwcIBAIds8EEcQNkFQ2zwlVSBtbds8yPhCAcxVIFrPFljPFszJ7VQKCw4Ceu1E0NQB+GL6QAEB+kABAdRVIGwTA9MfAYIQlGqYtrry4IHTPwExQTDbPNs8yPhCAcxVIFrPFljPFszJ7VQMDQEU+CgFcAUHRDTbPAkASnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAAMshVYFB2zxYUyz8SzMxBM1Ajyw/LDwHPFskABMjJAC7IVUBxUAbLHxTLPxLLPwH6AgJZzxbMyQAcyAGCEK/5D1dYyx/LP8kBJPhBbyQQI18DfwJwgEJYbW3bPA4B9shxAcoBUAcBygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY5MfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzJczMwFwAcoA4iFusw8AMJx/AcoAASBu8tCAAcyVMXABygDiyQH7AAIBIBITAHG93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTggZzq084r86ShYDrC3EyPZQBMbqt7tRNDUAfhi+kABAfpAAQHUVSBsE9s8gUATG4Ud7UTQ1AH4YvpAAQH6QAEB1FUgbBPbPIFQAEMDEAAls=';
    const __system = 'te6cckECGAEAAx4AAQHAAQEFoG0/AgEU/wD0pBP0vPLICwMCAWILBAIBIAYFAHG93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTggZzq084r86ShYDrC3EyPZQCASAJBwExuFHe1E0NQB+GL6QAEB+kABAdRVIGwT2zyAgAAlsBMbqt7tRNDUAfhi+kABAfpAAQHUVSBsE9s8gKAAQwMQOW0HAh10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QCJQZm8E+GECkVvgIIIQOSCDrbrjAiCCEAtztkW64wKCEJRqmLa64wIw8sCCEg8MAnrtRNDUAfhi+kABAfpAAQHUVSBsEwPTHwGCEJRqmLa68uCB0z8BMUEw2zzbPMj4QgHMVSBazxZYzxbMye1UDg0BJPhBbyQQI18DfwJwgEJYbW3bPBMAHMgBghCv+Q9XWMsfyz/JA7gw7UTQ1AH4YvpAAQH6QAEB1FUgbBMD0x8BghALc7ZFuvLggdM/0z9ZMhA0QwD4QW8kECNfA3BwgEAh2zwQRxA2QVDbPCVVIG1t2zzI+EIBzFUgWs8WWM8WzMntVBEQEwAuyFVAcVAGyx8Uyz8Syz8B+gICWc8WzMkABMjJA7ww7UTQ1AH4YvpAAQH6QAEB1FUgbBMD0x8BghA5IIOtuvLggdTU1NMP0w/6QAFDMBA2EDUQNDYQeBBnVQTbPFzbPHBwUEKAQFBCbQLbPMj4QgHMVSBazxZYzxbMye1UFhUTAfbIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GOTH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrMUADCcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAASnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydABFPgoBXAFB0Q02zwXADLIVWBQds8WFMs/EszMQTNQI8sPyw8BzxbJiwaz0g==';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    builder.writeAddress(owner);
    builder.writeCell(content);
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
}

export class NftManager implements Contract {
    
    static async init(owner: Address, content: Cell) {
        return await NftManager_init(owner,content);
    }
    
    static async fromInit(owner: Address, content: Cell) {
        const init = await NftManager_init(owner,content);
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DeployNftCollection | MintSafe | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployNftCollection') {
            body = beginCell().store(storeDeployNftCollection(message)).endCell();
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
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}