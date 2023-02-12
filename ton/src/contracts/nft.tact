import "@stdlib/ownable";
import "@stdlib/deploy";
// import "./nft-collection";
// import "./nft-item";

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

message DeployNftCollection {
  content: Cell;
  nft_item_code: Cell;
  nft_collection_code: Cell;
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
}

contract NftManager with Deployable, Ownable {
  owner: Address;
  // price: Int;
  // datetime_start: Int;
  // datetime_end: Int;
  nft_collection_address: Address;
  // total_supply: Int;
  // max_supply: Int;
  content: Cell;

  init(owner: Address, content: Cell) {
    self.owner = owner;
    self.content = content;
  }

  fun getCollectionStateInit(msg: DeployNftCollection): StateInit {
    let data: Cell = CollectionInitData {
      owner: myAddress(),
      next_item_index: 0,
      content: msg.content,
      nft_item_code: msg.nft_item_code,
      royalty: msg.royalty
    }.toCell();
    return StateInit{ code: msg.nft_collection_code, data: data };
  }

  receive(msg: DeployNftCollection) {
    let collectionStateInit: StateInit = self.getCollectionStateInit(msg);
    let collectionAddress: Address = contractAddress(collectionStateInit);

    send(SendParameters{
      to: collectionAddress,
      value: 0,
      mode: 64,
      bounce: false,
      code: collectionStateInit.code,
      data: collectionStateInit.data
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
        amount: 0,
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