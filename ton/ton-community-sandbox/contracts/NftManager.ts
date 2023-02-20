import { TupleBuilder, Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, toNano, SendMode } from "ton-core";

export type NftManagerData = {
  owner: Address;
  debug: number;
  nftCollectionAddress: Address;
  mintPrice: bigint;
  maxSupply: number;
}

export class NftManager implements Contract {
    static readonly code = Cell.fromBase64('te6ccgECGgEABBQAART/APSkE/S88sgLAQIBYgIDA5bQcCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAIlBmbwT4YQKRW+AgghAZ/C1EuuMCIIIQxhWacrrjAoIQlGqYtrrjAjDywIIEBQYCASASEwHIMO1E0NQB+GL6QAEB0w/6QAEB+gCBAQHXAFVAbBUF0x8BghAZ/C1EuvLggfpAATEQRRA0QTBVQNs8JIIAmsIExwUT8vQQNEMAyPhCAcxVQFBUzxYSyw8BzxZY+gKBAQHPAMntVAcBuDDtRNDUAfhi+kABAdMP+kABAfoAgQEB1wBVQGwVBdMfAYIQxhWacrry4IHTP9M/+kABQzAzEGcQVhBFEDRY2zzI+EIBzFVAUFTPFhLLDwHPFlj6AoEBAc8Aye1UCAKo7UTQ1AH4YvpAAQHTD/pAAQH6AIEBAdcAVUBsFQXTHwGCEJRqmLa68uCB0z8BMRBFEDRBMNs82zzI+EIBzFVAUFTPFhLLDwHPFlj6AoEBAc8Aye1UDg8AHPhBbyQQI18DJccF8uCEBLj4QW8kMDHIMgLPFts8AczJgTVqJoIQC+vCAKATvhLy9CPCAJmCALpiUyS58vTef3GL9ORlQgaXRlbSBtaW50ZWSNs8bW0sUUpENNs8f4IK+vCAUENxggkxLQBQBAkKEAsABMjJAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DEMAhLbPCZVIG1t2zwNEAC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DACTIVTBxUAXLHxPLP8s/AfoCzMkAHMgBghCv+Q9XWMsfyz/JAST4QW8kECNfA38CcIBCWG1t2zwQAfbIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GOTH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrMRADCcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wACASAUFQBxvd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4IGc6tPOK/OkoWA6wtxMj2UAUG6re7UTQ1AH4YvpAAQHTD/pAAQH6AIEBAdcAVUBsFds8gWAgEgFxgACBAkXwQBQbSjvaiaGoA/DF9IACA6Yf9IACA/QBAgIDrgCqgNgrtnkBkAPbUM3aiaGoA/DF9IACA6Yf9IACA/QBAgIDrgCqgNgrAABF8E');
    static readonly system = Cell.fromBase64('te6cckECHAEABB4AAQHAAQEFoG0/AgEU/wD0pBP0vPLICwMCAWINBAIBIAYFAHG93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTggZzq084r86ShYDrC3EyPZQCASALBwIBIAkIAD21DN2omhqAPwxfSAAgOmH/SAAgP0AQICA64AqoDYKwAUG0o72omhqAPwxfSAAgOmH/SAAgP0AQICA64AqoDYK7Z5AKAARfBAFBuq3u1E0NQB+GL6QAEB0w/6QAEB+gCBAQHXAFVAbBXbPIDAAIECRfBAOW0HAh10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QCJQZm8E+GECkVvgIIIQGfwtRLrjAiCCEMYVmnK64wKCEJRqmLa64wIw8sCCGhEOAqjtRNDUAfhi+kABAdMP+kABAfoAgQEB1wBVQGwVBdMfAYIQlGqYtrry4IHTPwExEEUQNEEw2zzbPMj4QgHMVUBQVM8WEssPAc8WWPoCgQEBzwDJ7VQQDwEk+EFvJBAjXwN/AnCAQlhtbds8FQAcyAGCEK/5D1dYyx/LP8kBuDDtRNDUAfhi+kABAdMP+kABAfoAgQEB1wBVQGwVBdMfAYIQxhWacrry4IHTP9M/+kABQzAzEGcQVhBFEDRY2zzI+EIBzFVAUFTPFhLLDwHPFlj6AoEBAc8Aye1UEgS4+EFvJDAxyDICzxbbPAHMyYE1aiaCEAvrwgCgE74S8vQjwgCZggC6YlMkufL03n9xi/TkZUIGl0ZW0gbWludGVkjbPG1tLFFKRDTbPH+CCvrwgFBDcYIJMS0AUAQZFxUTAhLbPCZVIG1t2zwUFQAkyFUwcVAFyx8Tyz/LPwH6AszJAfbIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GOTH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrMWADCcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wABQshwAcsfbwABb4xtb4wB2zxvIgHJkyFus5YBbyJZzMnoMRgAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwAEyMkByDDtRNDUAfhi+kABAdMP+kABAfoAgQEB1wBVQGwVBdMfAYIQGfwtRLry4IH6QAExEEUQNEEwVUDbPCSCAJrCBMcFE/L0EDRDAMj4QgHMVUBQVM8WEssPAc8WWPoCgQEBzwDJ7VQbABz4QW8kECNfAyXHBfLghBdab7A=');

    readonly address: Address;
    readonly init: { code: Cell; data: Cell; };

    mintPrice: bigint;

    constructor(workchain: number, initParams: {
        owner: Address
        mintPrice: bigint
        maxSupply?: number
        debug?: number
    }) {
      this.mintPrice = initParams.mintPrice;
      const data = beginCell()
        .storeRef(NftManager.system)
        .storeAddress(initParams.owner)
        .storeInt(initParams.debug ?? Math.floor(Math.random() * 10000), 16)
        .storeAddress(initParams.owner)
        .storeCoins(initParams.mintPrice)
        .storeInt(initParams.maxSupply ?? 0, 257)
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
        value: params.mintPrice + toNano('0.2'),
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

    async getManagerData(provider: ContractProvider): Promise<NftManagerData> {
      const { stack } = await provider.get('get_manager_data', new TupleBuilder().build())

      return {
        owner: stack.readAddress(),
        debug: stack.readNumber(),
        nftCollectionAddress: stack.readAddress(),
        mintPrice: stack.readBigNumber(),
        maxSupply: stack.readNumber(),
      }
    }
}