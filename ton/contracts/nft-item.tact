import "@stdlib/ownable";

contract NftItem with Ownable {
  collectionAddress: Address;
  index: Int;
  owner: Address;
  content: Cell;

  init(collectionAddress: Address, index: Int) {
    self.collectionAddress = collectionAddress;
  }

  get fun collection_address(): Address {
    return self.collectionAddress;
  }

  get fun content(): Cell {
    return self.content;
  }
}