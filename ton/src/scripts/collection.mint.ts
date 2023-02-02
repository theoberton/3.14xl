import { toNano, Address } from "ton-core";
import { NftCollection, MintItem } from "../output/pixel_NftCollection";
import { NetworkProvider } from "@ton-community/blueprint";
import { printAddress, print } from "../utils/print";

export async function run(network: NetworkProvider) {
  const contract = await NftCollection.fromAddress(Address.parse("EQCsRPdF0OBVT9PqMuYIF9GQSoJjxTVEt1CyEYt2lDiofL9P"));

  const openedContract = network.open(contract);
  const sender = network.sender();

  const mintItemMessage: MintItem = {
    $$type: "MintItem",
    to: network.sender().address || Address.parse("Insert your address for deep link deploy"),
  };

  // @todo: https://github.com/ton-community/blueprint/issues/2
  await openedContract.send(
    sender,
    {
      value: toNano("0.05"),
      bounce: undefined,
    },
    mintItemMessage
  );
}
