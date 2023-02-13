import "@stdlib/ownable";
import "@stdlib/deploy";

message(0x1) Mint {
  query_id: Int as uint64;
  item_index: Int as uint64;
  amount: Int as coins;
  item_content: Cell;
}

message MintSafe {
  query_id: Int as uint64;
  next_item_index: Int as uint64;
  item_content: Cell;
}

message SetNftCollectionAddress {
  nft_collection_address: Address;
}

contract NftManager with Deployable, Ownable {
  owner: Address;
  seed: Int;
  nft_collection_address: Address;

  // price: Int;
  // datetime_start: Int;
  // datetime_end: Int;
  // total_supply: Int;
  // max_supply: Int;

  init(owner: Address, seed: Int) {
    self.owner = owner;
    self.seed = seed;
    self.nft_collection_address = owner;
  }

  receive(msg: SetNftCollectionAddress) {
    self.requireOwner();

    require(self.owner == self.nft_collection_address, "NFT Manager Already Initialized");

    self.nft_collection_address = msg.nft_collection_address;
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
        item_content: msg.item_content
      }.toCell()
    });
  }

  get fun nft_collection_address(): Address {
    return self.nft_collection_address;
  }
}
