import "@stdlib/ownable";
import "@stdlib/deploy";

message(0x1) Mint {
  query_id: Int as uint64;
  item_index: Int as uint64;
  item_value: Int as coins;
  item_content: Cell;
}

message MintSafe {
  query_id: Int as uint64;
  next_item_index: Int as uint64;
  item_owner: Address;
}

message SetNftCollectionAddress {
  nft_collection_address: Address;
}

struct ManagerData {
  owner: Address;
  debug: Int as uint16;
  nft_collection_address: Address;
  mint_price: Int as coins;
  max_supply: Int;
}

contract NftManager with Deployable, Ownable {
  owner: Address;
  debug: Int as uint16;
  nft_collection_address: Address;
  mint_price: Int as coins;
  max_supply: Int;

  // datetime_start: Int;
  // datetime_end: Int;

  init(owner: Address, debug: Int, mint_price: Int, max_supply: Int) {
    self.owner = owner;
    self.debug = debug;
    self.nft_collection_address = owner;
    self.mint_price = mint_price;
    self.max_supply = max_supply;
  }

  receive(msg: SetNftCollectionAddress) {
    self.requireOwner();

    require(self.owner == self.nft_collection_address, "NFT Manager Already Initialized");

    self.nft_collection_address = msg.nft_collection_address;
  }

  receive(msg: MintSafe) {
    let ctx: Context = context();
    let item_content: Cell = beginCell().storeAddress(msg.item_owner).storeRef(emptyCell()).endCell();

    require(ctx.value >= self.mint_price + ton("0.2"), "Insufficient amount sent");

    if (self.max_supply > 0) {
      require(msg.next_item_index < self.max_supply, "Max supply reached");
    }

    send(SendParameters{
      to: self.owner,
      value: self.mint_price,
      mode: SendPayGasSeparately,
      body: "NFT item minted".asComment()
    });

    send(SendParameters{
      to: self.nft_collection_address,
      value: ton("0.05"),
      mode: SendPayGasSeparately,
      body: Mint {
        query_id: msg.query_id,
        item_index: msg.next_item_index,
        item_value: ton("0.02"),
        item_content: item_content
      }.toCell()
    });
  }

  get fun nft_collection_address(): Address {
    return self.nft_collection_address;
  }

  get fun get_manager_data(): ManagerData {
    return ManagerData{
      owner: self.owner,
      debug: self.debug,
      nft_collection_address: self.nft_collection_address,
      mint_price: self.mint_price,
      max_supply: self.max_supply
    };
  }
}
