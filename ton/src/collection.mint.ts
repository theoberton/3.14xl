import { toNano, Address } from "ton";
import { NftCollection, MintItem } from "./output/pixel_NftCollection";
import env from './env';
import { getClient, getSender, getProvider, getDeployerAddress } from './utils/helpers';

(async () => {
  if (!env.deployed.contractAddress) throw new Error('Deploy contract before sending mint message');

  const client = getClient();
  const sender = await getSender(client);
  const deployerAddress = await getDeployerAddress();
  const contract = NftCollection.fromAddress(Address.parse(env.deployed.contractAddress));
  const provider = getProvider(client, contract);

  const mintItemMessage: MintItem = {
    $$type: 'MintItem',
    to: deployerAddress
  };

  // @todo: fix failed contract deploy of NFTItem
  await contract.send(provider, sender, {
    value: toNano('0.05'),
    bounce: true
  }, mintItemMessage);
})();