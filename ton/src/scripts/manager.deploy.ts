import { beginCell, toNano, Address } from "ton-core";
import { NftManager } from "../output/pixel_NftManager";
import { NetworkProvider } from "@ton-community/blueprint";

import TonWeb from 'tonweb';

import { createOffchainUriCell, serializeUri } from 'tonweb/dist/types/contract/token/nft/utils';
const { Cell } = TonWeb.boc;

const ownerAddress = new Address(address);
const nftCollection = new NftCollection(tonweb.provider, {
  ownerAddress: walletAddress,
  royalty: 0.05,
  royaltyAddress: walletAddress,
  collectionContentUri: 'https://raw.githubusercontent.com/ton-blockchain/token-contract/main/nft/web-example/my_collection.json',
  nftItemContentBaseUri: 'https://raw.githubusercontent.com/ton-blockchain/token-contract/main/nft/web-example/',
  nftItemCodeHex: NftItem.codeHex
});

function createContentCell() {
  const collectionContentCell = createOffchainUriCell('https://raw.githubusercontent.com/ton-blockchain/token-contract/main/nft/web-example/my_collection.json');

  const commonContentCell = new Cell();
  commonContentCell.bits.writeBytes(serializeUri('https://raw.githubusercontent.com/ton-blockchain/token-contract/main/nft/web-example/'));

  const contentCell = new Cell();
  contentCell.refs[0] = collectionContentCell;
  contentCell.refs[1] = commonContentCell;

  return contentCell;
}


export async function run(network: NetworkProvider) {
  const owner = network.sender().address!;
  const nftCollectionAddress = Address.parse('EQBolupMwwwBH4OqzxbuDzncA5yQ24CMgWbnFWAGBwPKc_rq');


  const OFFCHAIN_CONTENT_PREFIX = 0x01;
  const string_first = "https://s.getgems.io/nft-staging/c/628f6ab8077060a7a8d52d63/";
  let newContent = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(string_first).endCell();

  const myContract = await NftManager.fromInit(owner, {
    $$type: 'NftCollectionInit',
    content: createContentCell(),
    // nft_item_code: Cell,
    // royalty: RoyaltyParams;
  }, {});

  await network.deploy(myContract, toNano("0.05"));

  const openedContract = network.open(myContract);

  console.log("Owner", await openedContract.getOwner());
}
