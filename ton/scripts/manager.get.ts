import { Address } from "ton-core";
import { NftManager } from "../output/manager_NftManager";
import { NetworkProvider } from "@ton-community/blueprint";
import TonWeb from "tonweb";

export async function run(network: NetworkProvider) {
  const managerAddress = Address.parse('EQCuPFvG98fs_gAlkENKa0wtldS2KDa5d2Mfj1aGYpKElhMy');

  const myContract = NftManager.fromAddress(managerAddress);

  const openedContract = network.open(myContract);

  const collectionAddress = await openedContract.getNftCollectionAddress();

  console.log("Owner", await openedContract.getOwner());
  console.log("NFT Collection Address", collectionAddress);

  const tonweb = new TonWeb(
    new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC", {
      apiKey: "4ff403d7763b912464241855e03d414c1deda0d73811ceb6c694d2b5f8737611",
    })
  );
  const collectionContract = new TonWeb.token.nft.NftCollection(tonweb.provider, {
    address: collectionAddress.toString(),
  });
  const collectionData = await collectionContract.getCollectionData();
  console.log("Collection owner", collectionData.ownerAddress.toString());
}
