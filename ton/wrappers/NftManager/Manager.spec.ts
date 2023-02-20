import { toNano, Cell } from "ton-core";
import { Blockchain, OpenedContract, SendMessageResult, TreasuryContract } from "@ton-community/sandbox";
import { NftCollection } from "./../NftCollection";
import { NftManager } from ".";
import { getDefaultNftCollectionData } from "./../utils";
import { compile } from "@ton-community/blueprint";

import "@ton-community/test-utils"; // register matchers

/** Helpers */
async function deployNftCollection(
  creator: OpenedContract<TreasuryContract>,
  manager: OpenedContract<NftManager>,
  collection: OpenedContract<NftCollection>
) {
  await creator.send({
    value: toNano("0.05"),
    to: manager.address,
    init: manager.init,
  });

  await creator.send({
    value: toNano("0.05"),
    to: collection.address,
    init: collection.init,
  });

  await manager.sendSetCollectionAddress(creator.getSender(), {
    collectionAddress: collection.address,
  });
}

async function mint(
  buyer: OpenedContract<TreasuryContract>,
  manager: OpenedContract<NftManager>,
  collection: OpenedContract<NftCollection>
) {
  const collectionData = await collection.getCollectionData();

  const result = await manager.sendMintSafe(buyer.getSender(), {
    mintPrice: manager.mintPrice,
    nextItemId: collectionData.nextItemId,
    itemOwner: buyer.address,
  });

  return result;
}

function expectSuccessfullMint(
  mintResult: SendMessageResult & { result: void },
  creator: OpenedContract<TreasuryContract>,
  manager: OpenedContract<NftManager>,
  collection: OpenedContract<NftCollection>
) {
  expect(mintResult.transactions).toHaveTransaction({
    from: manager.address,
    to: creator.address,
    value: manager.mintPrice,
    success: true,
  });

  expect(mintResult.transactions).toHaveTransaction({
    from: collection.address,
    deploy: true,
  });
}

function expectFailedMint(
  mintResult: SendMessageResult & { result: void },
  creator: OpenedContract<TreasuryContract>,
  manager: OpenedContract<NftManager>,
  collection: OpenedContract<NftCollection>
) {

  expect(mintResult.transactions).not.toHaveTransaction({
    from: manager.address,
    to: creator.address,
    value: manager.mintPrice,
  });

  expect(mintResult.transactions).not.toHaveTransaction({
    from: collection.address,
    deploy: true,
  });
}

describe("Collection", () => {
  let nftCollectionCode: Cell;

  beforeAll(async () => {
    nftCollectionCode = await compile("NftCollection/NftCollection");
  });
  it("should deploy manager and collection contracts", async () => {
    const blkch = await Blockchain.create();

    const creator = await blkch.treasury("creator");

    const manager = blkch.openContract(
      new NftManager(0, {
        owner: creator.address,
        mintPrice: toNano("1"),
      })
    );
    const nftCollectionConfig = getDefaultNftCollectionData({
      ownerAddress: manager.address,
    });

    const collection = blkch.openContract(NftCollection.createFromConfig(nftCollectionConfig, nftCollectionCode));

    await deployNftCollection(creator, manager, collection);

    const collectionData = await collection.getCollectionData();
    expect(collectionData.ownerAddress.equals(manager.address)).toBeTruthy();

    expect((await manager.getOwner()).equals(creator.address)).toBeTruthy();
    expect((await manager.getCollectionAddress()).equals(collection.address)).toBeTruthy();

    const buyer = await blkch.treasury("buyer");

    const firstMintResult = await mint(buyer, manager, collection);

    expectSuccessfullMint(firstMintResult, creator, manager, collection);

    const secondMintResult = await mint(buyer, manager, collection);

    expect(secondMintResult.transactions).toHaveTransaction({
      from: collection.address,
      deploy: true,
    });
  });

  it("should restrict minting by max supply rule", async () => {
    const blkch = await Blockchain.create();

    const creator = await blkch.treasury("creator");

    const manager = blkch.openContract(
      new NftManager(0, {
        owner: creator.address,
        mintPrice: toNano("1"),
        maxSupply: 1,
      })
    );
    const nftCollectionConfig = getDefaultNftCollectionData({
      ownerAddress: manager.address,
    });
    const collection = blkch.openContract(NftCollection.createFromConfig(nftCollectionConfig, nftCollectionCode));


    await deployNftCollection(creator, manager, collection);

    const buyer1 = await blkch.treasury("buyer1");
    const buyer2 = await blkch.treasury("buyer2");

    const successfullMintResult = await mint(buyer1, manager, collection);

    expectSuccessfullMint(successfullMintResult, creator, manager, collection);

    const failedMintResult = await mint(buyer2, manager, collection);

    expectFailedMint(failedMintResult, creator, manager, collection);
  });
});
