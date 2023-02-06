import { toNano, beginCell, Address } from "ton-core";
import { NftCollection } from "../output/pixel_NftCollection";
import { NetworkProvider } from "@ton-community/blueprint";

export async function run(network: NetworkProvider) {
  const randomSeed = Math.floor(Math.random() * 10000);
  const owner = network.sender().address || Address.parse("Insert your address for deep link deploy");
  const content = beginCell().storeUint(randomSeed, 256).endCell();
  const myContract = await NftCollection.fromInit(owner, content, "asd");

  await network.deploy(myContract, toNano("0.05"));

  const openedContract = network.open(myContract);

  console.log("Owner", await openedContract.getOwner());
}
