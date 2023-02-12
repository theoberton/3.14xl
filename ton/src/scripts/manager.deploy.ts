import { toNano, Address } from "ton-core";
import { NFTManager } from "../output/pixel_NFTManager";
import { NetworkProvider } from "@ton-community/blueprint";

export async function run(network: NetworkProvider) {
  const owner = network.sender().address!;
  const nftCollectionAddress = Address.parse('EQBolupMwwwBH4OqzxbuDzncA5yQ24CMgWbnFWAGBwPKc_rq');

  const myContract = await NFTManager.fromInit(owner, nftCollectionAddress);

  await network.deploy(myContract, toNano("0.05"));

  const openedContract = network.open(myContract);

  console.log("Owner", await openedContract.getOwner());
}
