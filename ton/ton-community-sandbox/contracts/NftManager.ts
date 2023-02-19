import { TupleBuilder, Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, toNano } from "ton-core";

export type NftCollectionData = {
    nextItemIndex: number
    content: Cell
    owner: Address
}

export class NftManager implements Contract {
    static readonly code = Cell.fromBase64('te6ccgECGAEAA7wAART/APSkE/S88sgLAQIBYgIDA5bQcCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAIlBmbwT4YQKRW+AgghAZ/C1EuuMCIIIQxhWacrrjAoIQlGqYtrrjAjDywIIEBQYCASASEwG2MO1E0NQB+GL6QAEBgQEB1wD6QAEB+gBVMGwUBNMfAYIQGfwtRLry4IH6QAExEDRBMFUw2zwjggCawgPHBRLy9EEwyPhCAcxVMFBDzxaBAQHPAFjPFgH6AsntVAcBqjDtRNDUAfhi+kABAYEBAdcA+kABAfoAVTBsFATTHwGCEMYVmnK68uCB0z/TP/pAAUMwMxBWEEUQNFjbPMj4QgHMVTBQQ88WgQEBzwBYzxYB+gLJ7VQIAprtRNDUAfhi+kABAYEBAdcA+kABAfoAVTBsFATTHwGCEJRqmLa68uCB0z8BMRA0QTDbPNs8yPhCAcxVMFBDzxaBAQHPAFjPFgH6AsntVA4PABz4QW8kECNfAyTHBfLghASK+EFvJDAxyDICzxbbPAHMyYE1aiWCCvrwgKBSMLzy9HByi/TkZUIGl0ZW0gbWludGVkjbPG1tLFFKRDTbPANwcFBDgEAGCQoQCwAEyMkBQshwAcsfbwABb4xtb4wB2zxvIgHJkyFus5YBbyJZzMnoMQwCFNs8JQNQRG1t2zwNEAC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DACTIVTBxUAXLHxPLP8s/AfoCzMkAHMgBghCv+Q9XWMsfyz/JAST4QW8kECNfA38CcIBCWG1t2zwQAfbIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GOTH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrMRADCcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wACASAUFQBxvd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4IGc6tPOK/OkoWA6wtxMj2UAT26re7UTQ1AH4YvpAAQGBAQHXAPpAAQH6AFUwbBTbPIFgE9uFHe1E0NQB+GL6QAEBgQEB1wD6QAEB+gBVMGwU2zyBcABhNfAwAEXwM=');
    static readonly system = Cell.fromBase64('te6cckECGgEAA8YAAQHAAQEFoG0/AgEU/wD0pBP0vPLICwMCAWILBAIBIAYFAHG93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTggZzq084r86ShYDrC3EyPZQCASAJBwE9uFHe1E0NQB+GL6QAEBgQEB1wD6QAEB+gBVMGwU2zyAgABF8DAT26re7UTQ1AH4YvpAAQGBAQHXAPpAAQH6AFUwbBTbPICgAGE18DA5bQcCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAIlBmbwT4YQKRW+AgghAZ/C1EuuMCIIIQxhWacrrjAoIQlGqYtrrjAjDywIIYDwwCmu1E0NQB+GL6QAEBgQEB1wD6QAEB+gBVMGwUBNMfAYIQlGqYtrry4IHTPwExEDRBMNs82zzI+EIBzFUwUEPPFoEBAc8AWM8WAfoCye1UDg0BJPhBbyQQI18DfwJwgEJYbW3bPBMAHMgBghCv+Q9XWMsfyz/JAaow7UTQ1AH4YvpAAQGBAQHXAPpAAQH6AFUwbBQE0x8BghDGFZpyuvLggdM/0z/6QAFDMDMQVhBFEDRY2zzI+EIBzFUwUEPPFoEBAc8AWM8WAfoCye1UEASK+EFvJDAxyDICzxbbPAHMyYE1aiWCCvrwgKBSMLzy9HByi/TkZUIGl0ZW0gbWludGVkjbPG1tLFFKRDTbPANwcFBDgEAGFxUTEQIU2zwlA1BEbW3bPBITACTIVTBxUAXLHxPLP8s/AfoCzMkB9shxAcoBUAcBygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY5MfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzJczMwFwAcoA4iFusxQAMJx/AcoAASBu8tCAAcyVMXABygDiyQH7AAFCyHAByx9vAAFvjG1vjAHbPG8iAcmTIW6zlgFvIlnMyegxFgC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAATIyQG2MO1E0NQB+GL6QAEBgQEB1wD6QAEB+gBVMGwUBNMfAYIQGfwtRLry4IH6QAExEDRBMFUw2zwjggCawgPHBRLy9EEwyPhCAcxVMFBDzxaBAQHPAFjPFgH6AsntVBkAHPhBbyQQI18DJMcF8uCEHcFliQ==');

    readonly address: Address;
    readonly init: { code: Cell; data: Cell; };

    mintPrice: bigint;

    constructor(workchain: number, initParams: {
        owner: Address
        mintPrice: bigint
        seed?: number
    }) {
      this.mintPrice = initParams.mintPrice;
      const data = beginCell()
        .storeRef(NftManager.system)
        .storeAddress(initParams.owner)
        .storeInt(initParams.seed ?? Math.floor(Math.random() * 10000), 257)
        .storeAddress(initParams.owner)
        .storeCoins(initParams.mintPrice)
        .endCell();
      this.init = { code: NftManager.code, data }
      this.address = contractAddress(workchain, this.init)
    }

    async sendSetCollectionAddress(provider: ContractProvider, via: Sender, params: {
      value?: bigint
      collectionAddress: Address
    }) {
      await provider.internal(via, {
        value: params.value ?? toNano('1'),
        body: beginCell()
            .storeUint(435957060, 32) // op
            .storeAddress(params.collectionAddress)
            .endCell()
      })
    }

    async sendMintSafe(provider: ContractProvider, via: Sender, params: {
      mintPrice: bigint
      queryId?: number
      nextItemIndex: number
      itemOwner: Address
    }) {
      await provider.internal(via, {
        value: params.mintPrice + toNano('1'),
        body: beginCell()
          .storeUint(3323304562, 32) // op
          .storeUint(params.queryId ?? 0, 64)
          .storeUint(params.nextItemIndex, 64)
          .storeAddress(params.itemOwner)
          .endCell()
      })
    }

    async getCollectionAddress(provider: ContractProvider): Promise<Address> {
        const { stack } = await provider.get('nft_collection_address', new TupleBuilder().build())

        return stack.readAddress();
    }

    async getOwner(provider: ContractProvider): Promise<Address> {
      const { stack } = await provider.get('owner', new TupleBuilder().build())

      return stack.readAddress();
  }
}