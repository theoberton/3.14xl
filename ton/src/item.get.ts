import { Address } from "ton";
import { NftItem } from "./output/pixel_NftItem";
import { printAddress, print } from "./utils/print";
import { getClient, getProvider } from "./utils/helpers";

(async () => {
  const client = getClient();
  const contract = NftItem.fromAddress(Address.parse('EQA7i-qcWC9UYfeuNDSnuXORc9vGwc97M8-KSJHzn6WhWzWN'));
  const provider = getProvider(client, contract);

  const owner = await contract.getOwner(provider);
  print('NFT Item owner');
  printAddress(owner);  

  const collectionAddress = await contract.getCollectionAddress(provider);
  print('NFT Collection address');
  printAddress(collectionAddress);  

  const content = await contract.getContent(provider);
  print('NFT Item', { content });
})();