import "@stdlib/ownable";
import "@stdlib/deploy";
import "./params.fc";

@name(pixel_addr)
native pixelAddress(): Address;

@name(min_tons_for_storage)
native minTonsForStorage(): Int;

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
  max_supply: Int as uint32;
  mint_date_start: Int as uint32;
  mint_date_end: Int as uint32;
}

message(0xd53276db) Excesses {
  query_id: Int as uint64;
}

contract NftManager with Deployable, Ownable {
  owner: Address;
  debug: Int as uint16;
  nft_collection_address: Address;
  mint_price: Int as coins;
  max_supply: Int as uint32;
  mint_date_start: Int as uint32;
  mint_date_end: Int as uint32;

  init(owner: Address, debug: Int, mint_price: Int, max_supply: Int, mint_date_start: Int, mint_date_end: Int) {
    self.owner = owner;
    self.debug = debug;
    self.nft_collection_address = owner;
    self.mint_price = mint_price;
    self.max_supply = max_supply;
    self.mint_date_start = mint_date_start;
    self.mint_date_end = mint_date_end;
  }

  receive(msg: SetNftCollectionAddress) {
    self.requireOwner();

    require(self.owner == self.nft_collection_address, "NFT Manager Already Initialized");

    self.nft_collection_address = msg.nft_collection_address;
  }

  receive(msg: MintSafe) {
    let ctx: Context = context();
    let item_content: Cell = beginCell().storeAddress(msg.item_owner).storeRef(emptyCell()).endCell();

    let pixelReward: Int = self.mint_price / 20;
    let restAmount: Int = myBalance() - minTonsForStorage() - self.mint_price - pixelReward - ton("0.05") - ton("0.03");

    require(restAmount >= 0, "Insufficient amount sent");

    require(self.max_supply == 0 || msg.next_item_index < self.max_supply, "Max supply reached");
    require(self.mint_date_start < now(), "Minting has not started yet");
    require(self.mint_date_end == 0 || self.mint_date_end > now(), "Minting has finished");

    send(SendParameters{
      to: self.owner,
      value: self.mint_price,
      mode: SendPayGasSeparately,
      body: "NFT item minted".asComment()
    });

    send(SendParameters{
      to: pixelAddress(),
      value: pixelReward,
      mode: SendPayGasSeparately,
      body: "NFT item minted".asComment()
    });

    send(SendParameters{
      to: self.nft_collection_address,
      value: ton("0.05"),
      body: Mint {
        query_id: msg.query_id,
        item_index: msg.next_item_index,
        item_value: ton("0.02"),
        item_content: item_content
      }.toCell()
    });

    send(SendParameters{
      to: ctx.sender,
      value: restAmount,
      mode: SendPayGasSeparately,
      body: Excesses {
        query_id: msg.query_id
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
      max_supply: self.max_supply,
      mint_date_start: self.mint_date_start,
      mint_date_end: self.mint_date_end
    };
  }
}
