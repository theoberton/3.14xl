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
export type UpdateContent = {
    $$type: 'UpdateContent';
    query_id: bigint;
    collection_content: Cell;
}

export function storeUpdateContent(src: UpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeRef(src.collection_content);
    };
}

export function loadUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _collection_content = sc_0.loadRef();
    return { $$type: 'UpdateContent' as const, query_id: _query_id, collection_content: _collection_content };
}

function loadTupleUpdateContent(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _collection_content = source.readCell();
    return { $$type: 'UpdateContent' as const, query_id: _query_id, collection_content: _collection_content };
}

function storeTupleUpdateContent(source: UpdateContent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeCell(source.collection_content);
    return builder.build();
}

function dictValueParserUpdateContent(): DictionaryValue<UpdateContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateContent(src.loadRef().beginParse());
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
export type EditData = {
    $$type: 'EditData';
    query_id: bigint;
    content: Cell;
    mint_price: bigint;
    mint_date_start: bigint;
    mint_date_end: bigint;
    payout_address: Address;
}

export function storeEditData(src: EditData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2226095555, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeRef(src.content);
        b_0.storeUint(src.mint_price, 64);
        b_0.storeUint(src.mint_date_start, 32);
        b_0.storeUint(src.mint_date_end, 32);
        b_0.storeAddress(src.payout_address);
    };
}

export function loadEditData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2226095555) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _content = sc_0.loadRef();
    let _mint_price = sc_0.loadUintBig(64);
    let _mint_date_start = sc_0.loadUintBig(32);
    let _mint_date_end = sc_0.loadUintBig(32);
    let _payout_address = sc_0.loadAddress();
    return { $$type: 'EditData' as const, query_id: _query_id, content: _content, mint_price: _mint_price, mint_date_start: _mint_date_start, mint_date_end: _mint_date_end, payout_address: _payout_address };
}

function loadTupleEditData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _content = source.readCell();
    let _mint_price = source.readBigNumber();
    let _mint_date_start = source.readBigNumber();
    let _mint_date_end = source.readBigNumber();
    let _payout_address = source.readAddress();
    return { $$type: 'EditData' as const, query_id: _query_id, content: _content, mint_price: _mint_price, mint_date_start: _mint_date_start, mint_date_end: _mint_date_end, payout_address: _payout_address };
}

function storeTupleEditData(source: EditData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeCell(source.content);
    builder.writeNumber(source.mint_price);
    builder.writeNumber(source.mint_date_start);
    builder.writeNumber(source.mint_date_end);
    builder.writeAddress(source.payout_address);
    return builder.build();
}

function dictValueParserEditData(): DictionaryValue<EditData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEditData(src)).endCell());
        },
        parse: (src) => {
            return loadEditData(src.loadRef().beginParse());
        }
    }
}
export type ChangeOwnerOfCollection = {
    $$type: 'ChangeOwnerOfCollection';
    new_owner: Address;
}

export function storeChangeOwnerOfCollection(src: ChangeOwnerOfCollection) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1126980855, 32);
        b_0.storeAddress(src.new_owner);
    };
}

export function loadChangeOwnerOfCollection(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1126980855) { throw Error('Invalid prefix'); }
    let _new_owner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOfCollection' as const, new_owner: _new_owner };
}

function loadTupleChangeOwnerOfCollection(source: TupleReader) {
    let _new_owner = source.readAddress();
    return { $$type: 'ChangeOwnerOfCollection' as const, new_owner: _new_owner };
}

function storeTupleChangeOwnerOfCollection(source: ChangeOwnerOfCollection) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_owner);
    return builder.build();
}

function dictValueParserChangeOwnerOfCollection(): DictionaryValue<ChangeOwnerOfCollection> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOfCollection(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOfCollection(src.loadRef().beginParse());
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
    nft_collection_address: Address;
    mint_price: bigint;
    max_supply: bigint;
    mint_date_start: bigint;
    mint_date_end: bigint;
    payout_address: Address;
}

export function storeManagerData(src: ManagerData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.nft_collection_address);
        b_0.storeCoins(src.mint_price);
        b_0.storeUint(src.max_supply, 32);
        b_0.storeUint(src.mint_date_start, 32);
        b_0.storeUint(src.mint_date_end, 32);
        b_0.storeAddress(src.payout_address);
    };
}

export function loadManagerData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _nft_collection_address = sc_0.loadAddress();
    let _mint_price = sc_0.loadCoins();
    let _max_supply = sc_0.loadUintBig(32);
    let _mint_date_start = sc_0.loadUintBig(32);
    let _mint_date_end = sc_0.loadUintBig(32);
    let _payout_address = sc_0.loadAddress();
    return { $$type: 'ManagerData' as const, owner: _owner, nft_collection_address: _nft_collection_address, mint_price: _mint_price, max_supply: _max_supply, mint_date_start: _mint_date_start, mint_date_end: _mint_date_end, payout_address: _payout_address };
}

function loadTupleManagerData(source: TupleReader) {
    let _owner = source.readAddress();
    let _nft_collection_address = source.readAddress();
    let _mint_price = source.readBigNumber();
    let _max_supply = source.readBigNumber();
    let _mint_date_start = source.readBigNumber();
    let _mint_date_end = source.readBigNumber();
    let _payout_address = source.readAddress();
    return { $$type: 'ManagerData' as const, owner: _owner, nft_collection_address: _nft_collection_address, mint_price: _mint_price, max_supply: _max_supply, mint_date_start: _mint_date_start, mint_date_end: _mint_date_end, payout_address: _payout_address };
}

function storeTupleManagerData(source: ManagerData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.nft_collection_address);
    builder.writeNumber(source.mint_price);
    builder.writeNumber(source.max_supply);
    builder.writeNumber(source.mint_date_start);
    builder.writeNumber(source.mint_date_end);
    builder.writeAddress(source.payout_address);
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
export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}
async function NftManager_init(owner: Address, mint_price: bigint, max_supply: bigint, mint_date_start: bigint, mint_date_end: bigint, payout_address: Address) {
    const __init = 'te6ccgEBBgEAQAABFP8A9KQT9LzyyAsBAgFiAgMCAs0EBQAJoUrd4A0AAdQAOWiUHyMxVYFB2zxZQBM8WWPoCyx/LHxLLHwHPFsm';
    const __code = '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';
    const __system = 'te6cckECJQEABlEAAQHAAQEFoG0/AgEU/wD0pBP0vPLICwMCAWINBAIBIAYFAHG93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTggZzq084r86ShYDrC3EyPZQCASALBwIBIAkIAEm1DN2omhqAPwxfSAAgP0gAID9AGmP6Y/pj/0gAIuLCoohmDYLwAU20o72omhqAPwxfSAAgP0gAID9AGmP6Y/pj/0gAIuLCoohmDYL7Z5AKAARfBgFNuq3u1E0NQB+GL6QAEB+kABAfoA0x/TH9Mf+kABFxYVFEMwbBfbPIDAAIEFZfBgICzg8OAElI0IYALSI332fmrU+mQPNJxkwFa/rnK28Q5/xRqOdyEAlZqKjIBJ9HAh10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QCJQZm8E+GECkVvgIIIQGfwtRLrjAiCCEEMsXPe64wIgghCEr4XDuuMCIIIQxhWacrqCMiHBAC8o7pMO1E0NQB+GL6QAEB+kABAfoA0x/TH9Mf+kABFxYVFEMwbBcH0x8BghDGFZpyuvLggdM/0z/6QAFDMDMQiRB4EGcQVhBFEDRY2zzI+EIBzFVgUHbPFlAEzxZY+gLLH8sfEssfAc8Wye1U4IIQlGqYtrrjAjDywIIUEQLC7UTQ1AH4YvpAAQH6QAEB+gDTH9Mf0x/6QAEXFhUUQzBsFwfTHwGCEJRqmLa68uCB0z8BMRBnEFYQRRA0QTDbPNs8yPhCAcxVYFB2zxZQBM8WWPoCyx/LHxLLHwHPFsntVBMSAST4QW8kECNfA38CcIBCWG1t2zweABzIAYIQr/kPV1jLH8s/yQT0+EFvJFvIMgLPFts8AczJKIAUqQT4J28Qggr68IChKqEhoYIK+vCAoYIJycOAoYE1aiHC//L0ggC6YirAAFNrubHy9IFcpCn4I7ny9IIAjMAowAAp+CO8sfL0f3GL9ORlQgaXRlbSBtaW50ZWSNs8bW0rBFYQRDTbPH8bGR4VBHTwAnGL9ORlQgaXRlbSBtaW50ZWSNs8EDQQIxAlbW3bPH+CCvrwgHCCCTEtAChIEwbbPFQTDANQZm1tGR4YFgMa2zx/cQTbPF4hbW3bPB4XHgAcyAGCENUydttYyx/LP8kAJMhVMHFQBcsfE8s/yz8B+gLMyQFCyHAByx9vAAFvjG1vjAHbPG8iAcmTIW6zlgFvIlnMyegxGgC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAATIyQJqMO1E0NQB+GL6QAEB+kABAfoA0x/TH9Mf+kABFxYVFEMwbBcH2zw2ELwQqxCaEIkQeBBnVQQhHQO+EGwQWxBKEDlIfNs8EDRfBPgnbxCCCvrwgKGCCvrwgKGBNWoBwv/y9H+CCvrwgAlwCds8E1RBE0qZbW3bPAYQNMj4QgHMVWBQds8WUATPFlj6Assfyx8Syx8BzxbJ7VQkIB4B9shxAcoBUAcBygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY5MfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzJczMwFwAcoA4iFusx8AMJx/AcoAASBu8tCAAcyVMXABygDiyQH7AAAWyFl0UAPLH8s/zMkAPNMfAYIQhK+Fw7ry4IHTP9TTP9Mf0x/6QAEWFRRDMAHuMO1E0NQB+GL6QAEB+kABAfoA0x/TH9Mf+kABFxYVFEMwbBcH0x8BghBDLFz3uvLggfpAATEQZxBWEEUQNEEwVWDbPDb4J28Qggr68IChgTVqAcL/8vRVBMj4QgHMVWBQds8WUATPFlj6Assfyx8Syx8BzxbJ7VQkAeIw7UTQ1AH4YvpAAQH6QAEB+gDTH9Mf0x/6QAEXFhUUQzBsFwfTHwGCEBn8LUS68uCB+kABMRBnEFYQRRA0QTBVYNs8JoIAmsIHxwUW8vQQVlUDyPhCAcxVYFB2zxZQBM8WWPoCyx/LHxLLHwHPFsntVCQAHPhBbyQQI18DJ8cF8uCEsna0pw==';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    builder.writeAddress(owner);
    builder.writeNumber(mint_price);
    builder.writeNumber(max_supply);
    builder.writeNumber(mint_date_start);
    builder.writeNumber(mint_date_end);
    builder.writeAddress(payout_address);
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
    
    static async init(owner: Address, mint_price: bigint, max_supply: bigint, mint_date_start: bigint, mint_date_end: bigint, payout_address: Address) {
        return await NftManager_init(owner,mint_price,max_supply,mint_date_start,mint_date_end,payout_address);
    }
    
    static async fromInit(owner: Address, mint_price: bigint, max_supply: bigint, mint_date_start: bigint, mint_date_end: bigint, payout_address: Address) {
        const init = await NftManager_init(owner,mint_price,max_supply,mint_date_start,mint_date_end,payout_address);
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetNftCollectionAddress | ChangeOwnerOfCollection | EditData | MintSafe | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetNftCollectionAddress') {
            body = beginCell().store(storeSetNftCollectionAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwnerOfCollection') {
            body = beginCell().store(storeChangeOwnerOfCollection(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EditData') {
            body = beginCell().store(storeEditData(message)).endCell();
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