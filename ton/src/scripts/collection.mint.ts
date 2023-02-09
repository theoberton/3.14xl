import { toNano, Address } from "ton-core";
import { NftCollection } from "../output/pixel_NftCollection";
import { NetworkProvider } from "@ton-community/blueprint";
import { printAddress, print } from "../utils/print";

export async function run(network: NetworkProvider) {
  const contract = await NftCollection.fromAddress(Address.parse("EQAdUZgiBUH-m_9aAtOburMflgYvJzncBxTxVH6azlLsUo1n"));

  const openedContract = network.open(contract);
  const sender = network.sender();

  const mintItemMessage = "Mint!";

  await openedContract.send(
    sender,
    {
      value: toNano("0.05"),
    },
    mintItemMessage
  );

  print("NFT Collection address");
  printAddress(openedContract.address);
}
