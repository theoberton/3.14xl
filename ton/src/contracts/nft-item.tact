import "@stdlib/ownable";

contract NftItem with Ownable {
  collection_address: Address;
  owner: Address;

  init(collection_address: Address, owner: Address) {
    self.collection_address = collection_address;
    self.owner = owner;
  }

   get fun collection_address(): Address {
    return self.collection_address;
  }
}