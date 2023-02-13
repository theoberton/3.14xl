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
export type CollectionData = {
    $$type: 'CollectionData';
    nextItemIndex: bigint;
    collectionContentUrl: Cell;
    owner: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.nextItemIndex, 257);
        b_0.storeRef(src.collectionContentUrl);
        b_0.storeAddress(src.owner);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _nextItemIndex = sc_0.loadIntBig(257);
    let _collectionContentUrl = sc_0.loadRef();
    let _owner = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContentUrl: _collectionContentUrl, owner: _owner };
}

function loadTupleCollectionData(source: TupleReader) {
    let _nextItemIndex = source.readBigNumber();
    let _collectionContentUrl = source.readCell();
    let _owner = source.readAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContentUrl: _collectionContentUrl, owner: _owner };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.nextItemIndex);
    builder.writeCell(source.collectionContentUrl);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}
export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
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
export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    queryId: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}
export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    queryId: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}
export type InitNftItem = {
    $$type: 'InitNftItem';
    queryId: bigint;
    owner: Address;
}

export function storeInitNftItem(src: InitNftItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(374944117, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.owner);
    };
}

export function loadInitNftItem(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 374944117) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _owner = sc_0.loadAddress();
    return { $$type: 'InitNftItem' as const, queryId: _queryId, owner: _owner };
}

function loadTupleInitNftItem(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'InitNftItem' as const, queryId: _queryId, owner: _owner };
}

function storeTupleInitNftItem(source: InitNftItem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserInitNftItem(): DictionaryValue<InitNftItem> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitNftItem(src)).endCell());
        },
        parse: (src) => {
            return loadInitNftItem(src.loadRef().beginParse());
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
async function NftCollection_init(owner: Address, collectionContentUrl: string, nftItemContentUrl: string, royaltyParams: RoyaltyParams) {
    const __init = 'te6ccgEBCAEA2wABFP8A9KQT9LzyyAsBAgFiAgMCAswEBQANoUrc3kfgFQAB3AJhtOALtngJtngPkZgOqkCg7Z4sKQICA54AJZmZkKCGoEcCAgOeAQICA54AA54tkgOZkwYGAULIcQHLB28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DEHALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwM=';
    const __code = 'te6ccgECJQEABSMAART/APSkE/S88sgLAQIBYgIDAgLKBAUCASAUFQPl17aLt+3Ah10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QCJQZm8E+GECkVvgIIIQaT05ULrjAiCCEJRqmLa64wLAAI6n+QGC8M0NmGyxovRornCJ9PwxYsEW5fU/vRGmg59S2/UECDCyuuMCkTDi8sCCgYHCAIB0hITA84w7UTQ1AH4YvpAAQGBAQHXANTU1AHQgQEB1wCBAQHXAPpAAUMwMxA3EDYQNRA0WGwXB9MfAYIQaT05ULry4IHTPwExEGcQVhBFEDRBMHD4QW8kECNfA3CAQFQ0difbPBA0QTBtbds8CRAKAvow7UTQ1AH4YvpAAQGBAQHXANTU1AHQgQEB1wCBAQHXAPpAAUMwMxA3EDYQNRA0WGwXB9MfAYIQlGqYtrry4IHTPwExEGcQVhBFEDRBMNs82zzI+EIBzFVgUHbPFhSBAQHPABLMzMhQQ1AjgQEBzwCBAQHPAAHPFskBzMntVAsMAcDtRNDUAfhi+kABAYEBAdcA1NTUAdCBAQHXAIEBAdcA+kABQzAzEDcQNhA1EDRYbBfbPMj4QgHMVWBQds8WFIEBAc8AEszMyFBDUCOBAQHPAIEBAc8AAc8WyQHMye1U2zENADDIVTCCEKjLAK1QBcsfE8s/yw/LDwHPFskAWMj4QgHMVWBQds8WFIEBAc8AEszMyFBDUCOBAQHPAIEBAc8AAc8WyQHMye1UABzIAYIQr/kPV1jLH8s/yQEk+EFvJBAjXwN/AnCAQlhtbds8EAQyJds8XNs8cHCAQCH4QW8kECNfA9s8XiNANCAhDg8AJMhZghAWWTF1UAPLH8s/Ac8WyQEK2zwFpAUQAfbIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GOTH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrMRADCcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAALQwbW1tBMjMBFBDzxaBAQHPAFjPFszJgAE0AtD0BDBtAYF56gGAEPQPb6Hy4IcBgXnqIgKAEPQXyPQAyUAD8CCACASAWFwIBSCIjAW24td7UTQ1AH4YvpAAQGBAQHXANTU1AHQgQEB1wCBAQHXAPpAAUMwMxA3EDYQNRA0WGwXVRbbPIGAIBIBkaAAgQWF8IAgFIGxwBbbT0faiaGoA/DF9IACAwICA64BqamoA6ECAgOuAQICA64B9IAChmBmIG4gbCBqIGiw2C6qDbZ5AfAWmujvaiaGoA/DF9IACAwICA64BqamoA6ECAgOuAQICA64B9IAChmBmIG4gbCBqIGiw2C+2eQB0Baa9r9qJoagD8MX0gAIDAgIDrgGpqagDoQICA64BAgIDrgH0gAKGYGYgbiBsIGogaLDYL7Z5AHgAEXwYABGxDAgzbPGxy2zwgIQAO+EL4KFjwIQBKcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0AFptgt9qJoagD8MX0gAIDAgIDrgGpqagDoQICA64BAgIDrgH0gAKGYGYgbiBsIGogaLDYL7Z5AkAHG3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOCBnOrTzivzpKFgOsLcTI9lAABl8EWA==';
    const __system = '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';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    builder.writeAddress(owner);
    builder.writeString(collectionContentUrl);
    builder.writeString(nftItemContentUrl);
    builder.writeTuple(storeTupleRoyaltyParams(royaltyParams));
    let __stack = builder.build();
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let initCell = Cell.fromBoc(Buffer.from(__init, 'base64'))[0];
    let system = await ContractSystem.create();
    let executor = await ContractExecutor.create({ code: initCell, data: new Cell() }, system);
    let res = await executor.get('init', __stack);
    if (!res.success) { throw Error(res.error); }
    if (res.exitCode !== 0 && res.exitCode !== 1) {
        if (NftCollection_errors[res.exitCode]) {
            throw new ComputeError(NftCollection_errors[res.exitCode].message, res.exitCode, { logs: res.logs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.logs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const NftCollection_errors: { [key: number]: { message: string } } = {
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

export class NftCollection implements Contract {
    
    static async init(owner: Address, collectionContentUrl: string, nftItemContentUrl: string, royaltyParams: RoyaltyParams) {
        return await NftCollection_init(owner,collectionContentUrl,nftItemContentUrl,royaltyParams);
    }
    
    static async fromInit(owner: Address, collectionContentUrl: string, nftItemContentUrl: string, royaltyParams: RoyaltyParams) {
        const init = await NftCollection_init(owner,collectionContentUrl,nftItemContentUrl,royaltyParams);
        const address = contractAddress(0, init);
        return new NftCollection(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftCollection(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: NftCollection_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Mint!' | GetRoyaltyParams | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'Mint!') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetRoyaltyParams') {
            body = beginCell().store(storeGetRoyaltyParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, itemIndex: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(itemIndex);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, itemIndex: bigint, itemContent: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(itemIndex);
        builder.writeCell(itemContent);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getRoyaltyParams(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('royalty_params', builder.build())).stack;
        const result = loadTupleRoyaltyParams(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}