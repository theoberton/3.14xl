import { toNano, beginCell } from "ton-core";
import { NftCollection } from "../output/pixel_NftCollection";
import { NetworkProvider } from "@ton-community/blueprint";
import { testAddress } from "ton-emulator";

export async function run(provider: NetworkProvider) {
  const randomSeed = Math.random();
  const owner = await testAddress(randomSeed.toString());
  const content = beginCell().storeUint(0, 2).endCell();
  const myContract = await NftCollection.fromInit(owner, content);

  await provider.deploy(myContract, toNano("0.05"));

  const openedContract = provider.open(myContract);

  console.log("Owner", await openedContract.getOwner());
}
