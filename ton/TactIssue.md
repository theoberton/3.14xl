You can't just have field in the contract without initialization and no error on build stage; You error on the following ts call
await NftCollection.init(deployerAddress);

> handling exception code 7: not an integer

example
import "@stdlib/ownable";
import "@stdlib/deploy";

contract NftCollection with Deployable, Ownable {
owner: Address;
next_item_index: Int;

    init(owner: Address) {
        self.owner = owner;
    }

}
