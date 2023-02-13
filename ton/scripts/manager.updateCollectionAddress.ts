import { Address, toNano } from "ton-core";
import { NftManager, UpdateNftCollectionAddress } from "../output/manager_NftManager";
import { NetworkProvider } from "@ton-community/blueprint";

export async function run(network: NetworkProvider) {
  const managerAddress = Address.parse("EQC-qcNxtdu0beWHZZoynGsoKGo7ZLev7rd3UYTO31LM4AqH");
  const managerContract = NftManager.fromAddress(managerAddress);
  const managerOpenedContract = network.open(managerContract);

  const mintMessage: UpdateNftCollectionAddress = {
    $$type: "UpdateNftCollectionAddress",
    nft_collection_address: Address.parse("EQDKrn1zD7PraerKlAJsIlLX7MAOvPeLnvpY6CLdD01jTe7V"),
  };

  await managerOpenedContract.send(
    network.sender(),
    {
      value: toNano("0.05"),
    },
    mintMessage
  );
}
