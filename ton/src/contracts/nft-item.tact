import "@stdlib/ownable";

contract NftItem with Ownable {
  collection_address: Address;
  owner: Address;
  content: Slice;

  init(collection_address: Address, owner: Address, content: Slice) {
    self.collection_address = collection_address;
    self.owner = owner;
    self.content = content;
  }

  get fun collection_address(): Address {
    return self.collection_address;
  }

  get fun content(): Slice {
    return self.content;
  }
}