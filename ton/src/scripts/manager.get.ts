import { Address } from "ton-core";
import { NFTManager } from "../output/pixel_NFTManager";
import { NetworkProvider } from "@ton-community/blueprint";

export async function run(network: NetworkProvider) {
  const owner = network.sender().address!;
  const managerAddress = Address.parse('EQAvSqL8hr_FsdFfPPhVaBKabWGXHuL_cLA7FYTg9E3yQKI7');

  const myContract = NFTManager.fromAddress(managerAddress);

  const openedContract = network.open(myContract);

  console.log("Owner", await openedContract.getOwner());
  console.log("NFT Collection Address", await openedContract.getNftCollectionAddress());
}
