import "@stdlib/ownable";
import "@stdlib/deploy";

struct RoyaltyParams {
  royalty_factor: Int as uint16;
  roaylty_base: Int as uint16;
  roaylty_address: Address;
}

struct CollectionInitData {
  owner: Address;
  next_item_index: Int as uint64;
  content: Cell;  
  nft_item_code: Cell;
  royalty: RoyaltyParams;
}


struct ItemContent {
  owner: Address;
  content: Cell;
}

message(0x1) Mint {
  query_id: Int as uint64;
  item_index: Int as uint64;
  amount: Int as coins;
  item_content: ItemContent;
}

message MintSafe {
  query_id: Int as uint64;
  next_item_index: Int as uint64;
  itemContent: Cell;
}

message UpdateNftCollectionAddress {
  nft_collection_address: Address;
}

message DeployNftCollection {
  query_id: Int;
}

struct NftCollectionInit {
  content: Cell;
  nft_item_code: Cell;
  royalty: RoyaltyParams;
}

contract NftManager with Deployable, Ownable {
  owner: Address;
  nft_collection_init: NftCollectionInit;
  nft_collection_code: Cell;
  nft_collection_address: Address;

  // price: Int;
  // datetime_start: Int;
  // datetime_end: Int;
  // total_supply: Int;
  // max_supply: Int;

  init(owner: Address, nft_collection_init: NftCollectionInit, nft_collection_code: Cell) {
    self.owner = owner;
    self.nft_collection_init = nft_collection_init;
    self.nft_collection_code = nft_collection_code;

    let winit: StateInit = self.getNftCollectionStateInit();
    self.nft_collection_address = contractAddress(winit);
  }

  receive(msg: UpdateNftCollectionAddress) {
    self.requireOwner();

    self.nft_collection_address = msg.nft_collection_address;
  }

  fun getNftCollectionStateInit(): StateInit {
    return StateInit {
      code: self.nft_collection_code,
      data: CollectionInitData {
        owner: myAddress(),
        next_item_index: 0,
        content: self.nft_collection_init.content,
        nft_item_code: self.nft_collection_init.nft_item_code,
        royalty: self.nft_collection_init.royalty
      }.toCell() 
    };
  }

  receive(msg: DeployNftCollection) {
    let winit: StateInit = self.getNftCollectionStateInit();
    
    send(SendParameters{
      to: contractAddress(winit),
      value: 0,
      mode: 64,
      bounce: false,
      code: winit.code,
      data: winit.data
    });
  }

  receive(msg: MintSafe) {
    let ctx: Context = context();

    send(SendParameters{
      to: self.nft_collection_address,
      value: 0,
      mode: 64,
      bounce: false,
      body: Mint {
        query_id: msg.query_id,
        item_index: msg.next_item_index,
        amount: ctx.value,
        item_content: ItemContent {
          owner: ctx.sender,
          content: emptyCell()
        }
      }.toCell()
    });
  }

  get fun nft_collection_address(): Address {
    return self.nft_collection_address;
  }
}



