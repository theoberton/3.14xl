import "@stdlib/ownable";
import "@stdlib/deploy";
import "@stdlib/content";



struct CollectionData {
    nextItemIndex: Int;
    collectionContentUrl: Cell;
    owner: Address;
}

struct RoyaltyParams {
    numerator: Int;
    denominator: Int;
    destination: Address;
}


message(0x693d3950) GetRoyaltyParams {
    queryId: Int as uint64;
}

message(0xa8cb00ad) ReportRoyaltyParams {
    queryId: Int as uint64;
    numerator:  Int as uint16;
    denominator: Int as uint16;
    destination: Address;
}

message InitNftItem {
    queryId: Int as uint64;
    owner: Address;
}

// struct TokenTransferInternal {
//     queryId: Int as uint64;
//     from: Address;
//     forwardTonAmount: Int as coins;
//     forwardPayload: Slice as remaining;
// }

contract NftCollection with Deployable, Ownable {
    owner: Address;
    nextItemIndex: Int = 0;
    collectionContentUrl: Cell;
    nftItemContentUrl: Cell;
    royaltyParams: RoyaltyParams;
    


    init(owner: Address, collectionContentUrl: String, nftItemContentUrl: String, royaltyParams: RoyaltyParams) {
        self.owner = owner;
        self.collectionContentUrl = createOffchainContent(collectionContentUrl);
        self.nftItemContentUrl = createOffchainContent(nftItemContentUrl);
        self.royaltyParams = royaltyParams;
    }

    fun getNftItemInit(itemIndex: Int): StateInit {
        return initOf NftItem(myAddress(), itemIndex);
    }

    receive("Mint!") {
        let winit: StateInit = self.getNftItemInit(self.nextItemIndex);
        let nftItemAddress: Address = contractAddress(winit);

        send(SendParameters{
            to: nftItemAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: InitNftItem{ 
                queryId: 0,
                owner: context().sender
            }.toCell(),
            code: winit.code,
            data: winit.data
        });

        self.nextItemIndex = self.nextItemIndex + 1;
    }

    receive(msg: GetRoyaltyParams) {   
        send(SendParameters{
                to: context().sender,
                value: 0,
                mode: 64, 
                bounce: false,
                body: ReportRoyaltyParams {
                    queryId: msg.queryId,
                    numerator:  self.royaltyParams.numerator,
                    denominator: self.royaltyParams.denominator,
                    destination: self.royaltyParams.destination
                }.toCell()
        });        
    }

    get fun get_collection_data(): CollectionData {
        return CollectionData{
            nextItemIndex: self.nextItemIndex,
            collectionContentUrl: self.collectionContentUrl,
            owner: self.owner
        };
    }

     get fun get_nft_address_by_index(itemIndex: Int): Address {
        return contractAddress(self.getNftItemInit(itemIndex));
    }

     get fun get_nft_content(itemIndex: Int, itemContent: Cell): Cell {
        return self.nftItemContentUrl;
     }

     get fun royalty_params(): RoyaltyParams {
        return self.royaltyParams;
     }
}
    