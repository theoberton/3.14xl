import { Address } from "ton-core";
import { NftCollection } from "../output/nft_NftCollection";
import { NetworkProvider } from "@ton-community/blueprint";
import { printAddress, print } from "../utils/print";

export async function run(network: NetworkProvider) {
  const contract = await NftCollection.fromAddress(Address.parse("EQAdUZgiBUH-m_9aAtOburMflgYvJzncBxTxVH6azlLsUo1n"));

  const provider = network.provider(contract.address);

  const owner = await contract.getOwner(provider);
  print("NFT Collection owner");
  printAddress(owner);

  const data = await contract.getGetCollectionData(provider);
  print("NFT Collection", { data });
}
