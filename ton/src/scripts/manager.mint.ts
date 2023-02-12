import { Address, toNano } from "ton-core";
import { NFTManager, MintSafe } from "../output/pixel_NFTManager";
import { NftCollection } from "../output/pixel_NftCollection";
import { NetworkProvider } from "@ton-community/blueprint";

export async function run(network: NetworkProvider) {
  const managerAddress = Address.parse('EQAvSqL8hr_FsdFfPPhVaBKabWGXHuL_cLA7FYTg9E3yQKI7');
  const managerContract = NFTManager.fromAddress(managerAddress);
  const managerOpenedContract = network.open(managerContract);
  const nftCollectionAddress = await managerOpenedContract.getNftCollectionAddress();
  const nftCollectionContract = NftCollection.fromAddress(nftCollectionAddress);
  const nftCollectionOpenedContract = network.open(nftCollectionContract);
  const collectionData = await nftCollectionOpenedContract.getGetCollectionData();

  const mintMessage: MintSafe = {
    $$type: 'MintSafe',
    query_id: 0n,
    next_item_index: collectionData.nextItemIndex
  };

  await managerOpenedContract.send(network.sender(), {
    value: toNano('0.05'),
    bounce: true,
  }, mintMessage);
}
