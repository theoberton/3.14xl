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
    DictionaryValue
} from 'ton-core';

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

 type NftManager_init_args = {
    $$type: 'NftManager_init_args';
    owner: Address;
    mint_price: bigint;
    max_supply: bigint;
    mint_date_start: bigint;
    mint_date_end: bigint;
    payout_address: Address;
    content_init: Cell;
}

function initNftManager_init_args(src: NftManager_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.mint_price, 257);
        b_0.storeInt(src.max_supply, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.mint_date_start, 257);
        b_1.storeInt(src.mint_date_end, 257);
        b_1.storeAddress(src.payout_address);
        b_1.storeRef(src.content_init);
        b_0.storeRef(b_1.endCell());
    };
}

async function NftManager_init(owner: Address, mint_price: bigint, max_supply: bigint, mint_date_start: bigint, mint_date_end: bigint, payout_address: Address, content_init: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftManager_init_args({ $$type: 'NftManager_init_args', owner, mint_price, max_supply, mint_date_start, mint_date_end, payout_address, content_init })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
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
    137: { message: `Masterchain support is not enabled for this contract` },
    13674: { message: `Insufficient amount sent` },
    23716: { message: `Minting has not started yet` },
    36032: { message: `Minting has finished` },
    39618: { message: `NFT Manager Already Initialized` },
    47714: { message: `Max supply reached` },
}

export class NftManager implements Contract {
    
    static async init(owner: Address, mint_price: bigint, max_supply: bigint, mint_date_start: bigint, mint_date_end: bigint, payout_address: Address, content_init: Cell) {
        return await NftManager_init(owner, mint_price, max_supply, mint_date_start, mint_date_end, payout_address, content_init);
    }
    
    static async fromInit(owner: Address, mint_price: bigint, max_supply: bigint, mint_date_start: bigint, mint_date_end: bigint, payout_address: Address, content_init: Cell) {
        const init = await NftManager_init(owner, mint_price, max_supply, mint_date_start, mint_date_end, payout_address, content_init);
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