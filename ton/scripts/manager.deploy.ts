import { beginCell, toNano, Address } from "ton-core";
import { NftManager, storeSetNftCollectionAddress } from "../output/manager_NftManager";
import { NetworkProvider } from "@ton-community/blueprint";

export async function run(network: NetworkProvider) {
  const owner = network.sender().address!;
  const seed = BigInt(Math.floor(Math.random() * 100000));

  const myContract = await NftManager.fromInit(owner, seed);

  console.log('Address', myContract.address);

  const setNftCollectionAddressCell = beginCell().store(storeSetNftCollectionAddress({
    $$type: 'SetNftCollectionAddress',
    nft_collection_address: Address.parse('EQDPaSy-TiGLtnYHRwXo0vlRnE5N75olpht7-X1ZOksEqaTf'),
  })).endCell();

  await network.deploy(myContract, toNano("0.05"), setNftCollectionAddressCell);

  const openedContract = network.open(myContract);

  console.log("NFT Collection", await openedContract.getNftCollectionAddress());
}
