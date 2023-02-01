import { Address } from "ton";
import { NftCollection } from "./output/pixel_NftCollection";
import { printAddress, print } from "./utils/print";
import env from './env';
import { getClient, getProvider } from "./utils/helpers";

(async () => {
  if (!env.deployed.contractAddress) throw new Error('Deploy contract before using getters');

  const client = getClient();
  const contract = NftCollection.fromAddress(Address.parse(env.deployed.contractAddress));
  const provider = getProvider(client, contract);

  const owner = await contract.getOwner(provider);
  print('NFT Collection owner');
  printAddress(owner);  

  const totalSupply = await contract.getTotalSupply(provider);
  const content = await contract.getContent(provider);
  print('NFT Collection', { totalSupply, content });
})();