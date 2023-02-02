import { toNano, beginCell, Address } from "ton-core";
import { printAddress, print } from "../utils/print";
import { NftItem } from "../output/pixel_NftItem";
import { NetworkProvider } from "@ton-community/blueprint";

export async function run(network: NetworkProvider) {
  const contract = NftItem.fromAddress(Address.parse("EQCperERmGH-8LX4NzwebgRbzUmdvL5nSTSFy4S1CDnq6wBB"));
  const provider = network.provider(contract.address);

  const owner = await contract.getOwner(provider);
  print("NFT Item owner");
  printAddress(owner);

  const collectionAddress = await contract.getCollectionAddress(provider);
  print("NFT Collection address");
  printAddress(collectionAddress);

  const content = await contract.getContent(provider);
  print("NFT Item", { content });
}
