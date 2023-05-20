import "@stdlib/ownable";
import "@stdlib/deploy";
import "./params.fc";

const minTonsForStorage: Int = ton("0.05");
const pixelTreasury: Address = address("EQAkL7VQ5_K7Ksc_J2xnAM_umLjed1aPekxOk0drbQcnGfWy");

message(0x1) Mint {
  query_id: Int as uint64;
  item_index: Int as uint64;
  item_value: Int as coins;
  item_content: Cell;
}

message(0x4) UpdateContent {
  query_id: Int as uint64;
  collection_content: Cell;
}

message(0xc6159a72) MintSafe {
  query_id: Int as uint64;
  next_item_index: Int as uint64;
  item_owner: Address?;
}

message EditData {
  query_id: Int as uint64;
  content: Cell;
  mint_price: Int as uint64;
  mint_date_start: Int as uint32;
  mint_date_end: Int as uint32;
  payout_address: Address;
}

message ChangeOwnerOfCollection {
  new_owner: Address;
}

message SetNftCollectionAddress {
  nft_collection_address: Address;
}

struct ManagerData {
  owner: Address;
  nft_collection_address: Address;
  mint_price: Int as coins;
  max_supply: Int as uint32;
  mint_date_start: Int as uint32;
  mint_date_end: Int as uint32;
  payout_address: Address;
}

message(0xd53276db) Excesses {
  query_id: Int as uint64;
}

struct InitArgs {
  owner: Address;
  mint_price: Int as coins;
  max_supply: Int as uint32;
  mint_date_start: Int as uint32;
  mint_date_end: Int as uint32;
  payout_address: Address;
  content_init: Cell;
  is_pixel_fee_disabled: Bool;
}

contract NftManager with Deployable, Ownable {
  owner: Address;
  nft_collection_address: Address;
  mint_price: Int as coins;
  max_supply: Int as uint32;
  mint_date_start: Int as uint32;
  mint_date_end: Int as uint32;
  payout_address: Address;
  content_init: Cell;
  is_pixel_fee_disabled: Bool;

  init(
    initArgs: InitArgs
  ) {
    let ctx: Context = context();

    self.owner = initArgs.owner;
    self.nft_collection_address = initArgs.owner;
    self.mint_price = initArgs.mint_price;
    self.max_supply = initArgs.max_supply;
    self.mint_date_start = initArgs.mint_date_start;
    self.mint_date_end = initArgs.mint_date_end;
    self.payout_address = initArgs.payout_address;
    self.content_init = initArgs.content_init;
    self.is_pixel_fee_disabled = initArgs.is_pixel_fee_disabled;
  }

  receive(msg: SetNftCollectionAddress) {
    self.requireOwner();

    require(self.owner == self.nft_collection_address, "NFT Manager Already Initialized");

    self.nft_collection_address = msg.nft_collection_address;
  }

  receive(msg: ChangeOwnerOfCollection) {
    self.requireOwner();

    let restAmount: Int = myBalance() - minTonsForStorage;

    require(restAmount >= 0, "Insufficient amount sent");

    self.owner = msg.new_owner;
  }

  receive(msg: EditData) {
    self.requireOwner();

    let storageFee: Int = max(minTonsForStorage - myBalance(), 0);
    let restAmount: Int = context().value - storageFee - ton("0.02");

    require(restAmount >= 0, "Insufficient amount sent");

    self.mint_price = msg.mint_price;
    self.mint_date_start = msg.mint_date_start;
    self.mint_date_end = msg.mint_date_end;
    self.payout_address = msg.payout_address;

    send(SendParameters {
      to: self.nft_collection_address,
      value: ton("0.02"),
      body: UpdateContent {
        query_id: msg.query_id,
        collection_content: msg.content
      }.toCell()
    });

     send(SendParameters {
      to: sender(),
      value: restAmount,
      body: Excesses {
        query_id: msg.query_id
      }.toCell()  
    });
  }

  receive(msg: MintSafe) {
    let ctx: Context = context();

    let minterAddress: Address = ctx.sender;

    if (msg.item_owner != null) {
      minterAddress = msg.item_owner!!;
    }

    let item_content: Cell = beginCell().storeAddress(minterAddress).storeRef(emptyCell()).endCell();

    let pixelReward: Int = 0;
    if(!self.is_pixel_fee_disabled) {
      pixelReward = self.mint_price / 20;
    }

    let restAmount: Int = myBalance() - minTonsForStorage - self.mint_price - pixelReward - ton("0.05") - ton("0.03");

    require(restAmount >= 0, "Insufficient amount sent");

    require(self.max_supply == 0 || msg.next_item_index < self.max_supply, "Max supply reached");
    require(self.mint_date_start < now(), "Minting has not started yet");
    require(self.mint_date_end == 0 || self.mint_date_end > now(), "Minting has finished");

    if (self.mint_price > 0) {
      send(SendParameters{
        to: self.payout_address,
        value: self.mint_price,
        mode: SendPayGasSeparately,
        body: "NFT item minted".asComment()
      });

      if(!self.is_pixel_fee_disabled) {
        send(SendParameters{
          to: pixelTreasury,
          value: pixelReward,
          mode: SendPayGasSeparately,
          body: "NFT item minted".asComment()
        });
      }
    }

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
      nft_collection_address: self.nft_collection_address,
      mint_price: self.mint_price,
      max_supply: self.max_supply,
      mint_date_start: self.mint_date_start,
      mint_date_end: self.mint_date_end,
      payout_address: self.payout_address
    };
  }
}
