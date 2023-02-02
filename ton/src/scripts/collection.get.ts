import { Address } from "ton-core";
import { NftCollection } from "../output/pixel_NftCollection";
import { NetworkProvider } from "@ton-community/blueprint";
import { printAddress, print } from "../utils/print";

export async function run(network: NetworkProvider) {
  const contract = await NftCollection.fromAddress(Address.parse("EQCsRPdF0OBVT9PqMuYIF9GQSoJjxTVEt1CyEYt2lDiofL9P"));

  const provider = network.provider(contract.address);

  const owner = await contract.getOwner(provider);
  print("NFT Collection owner");
  printAddress(owner);

  const totalSupply = await contract.getTotalSupply(provider);
  const content = await contract.getContent(provider);
  print("NFT Collection", { totalSupply, content });
}
