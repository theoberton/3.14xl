import { Address, toNano } from "ton-core";
import { NftManager, MintSafe } from "../output/pixel_NftManager";
import { NetworkProvider } from "@ton-community/blueprint";
import TonWeb from 'tonweb';

export async function run(network: NetworkProvider) {
  const managerAddress = Address.parse('EQC-qcNxtdu0beWHZZoynGsoKGo7ZLev7rd3UYTO31LM4AqH');
  const managerContract = NftManager.fromAddress(managerAddress);
  const openedContract = network.open(managerContract);
  const collectionAddress = await openedContract.getNftCollectionAddress()


  const tonweb = new TonWeb(
    new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
      apiKey: '4ff403d7763b912464241855e03d414c1deda0d73811ceb6c694d2b5f8737611',
    })
  );
  const collectionContract = new TonWeb.token.nft.NftCollection(tonweb.provider, { address: collectionAddress.toString() });
  const collectionData = await collectionContract.getCollectionData();
  console.log('Collection owner', collectionData.ownerAddress.toString());

  const mintMessage: MintSafe = {
    $$type: 'MintSafe',
    query_id: 0n,
    next_item_index: BigInt(collectionData.nextItemIndex)
  };

  await openedContract.send(network.sender(), {
    value: toNano('0.08'),
  }, mintMessage);
}
