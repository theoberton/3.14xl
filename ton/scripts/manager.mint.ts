import { Address, toNano } from "ton-core";
import { NftManager, MintSafe } from "../output/manager_NftManager";
import { NetworkProvider } from "@ton-community/blueprint";
import TonWeb from "tonweb";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage();

export async function run(network: NetworkProvider) {
  const owner = network.sender().address!;

  const managerAddress = Address.parse("EQBCEgjp2118YnOgjKZu0nTFSYJIHAYPgb-h6BubapfDwnHV");
  const managerContract = NftManager.fromAddress(managerAddress);
  const openedContract = network.open(managerContract);
  const collectionAddress = await openedContract.getNftCollectionAddress();

  const tonweb = new TonWeb(
    new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC", {
      apiKey: "4ff403d7763b912464241855e03d414c1deda0d73811ceb6c694d2b5f8737611",
    })
  );
  const collectionContract = new TonWeb.token.nft.NftCollection(tonweb.provider, {
    address: collectionAddress.toString(),
  });
  const collectionData = await collectionContract.getCollectionData();
  const collectionContent = await storage.downloadJSON(collectionData.collectionContentUri);
  console.log("Collection owner", collectionData.ownerAddress.toString());
  console.log("Collection content", collectionContent);

  const mintMessage: MintSafe = {
    $$type: "MintSafe",
    query_id: 0n,
    next_item_index: BigInt(collectionData.nextItemIndex),
    item_owner: owner,
  };

  await openedContract.send(
    network.sender(),
    {
      value: toNano("0.2") + toNano(collectionContent.price),
    },
    mintMessage
  );
}
