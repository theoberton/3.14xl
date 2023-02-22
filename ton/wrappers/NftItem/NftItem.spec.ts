import "@ton-community/test-utils";

import { Cell, toNano } from "ton-core";
import { Blockchain, OpenedContract, TreasuryContract } from "@ton-community/sandbox";
import { compile } from "@ton-community/blueprint";
import { NftItem } from ".";
import { randomAddress } from "./../utils";
import { NftItemData } from "../types";
import { getDefaultNftItemData } from "../utils";

describe("nft item smc", () => {
  let code: Cell;

  beforeAll(async () => {
    code = await compile("NftItem/NftItem");
  });

  describe("nft item getters", () => {
    let blockchain: Blockchain | null;
    let contract: OpenedContract<NftItem> | null;
    let nftItem: NftItem | null;
    let nftItemConfig: NftItemData | null;
    let ownerOfItem: OpenedContract<TreasuryContract> | null;

    beforeEach(async () => {
      blockchain = await Blockchain.create();

      const deployer = await blockchain.treasury("deployer");

      ownerOfItem = await blockchain.treasury("owner_of_item");
      const ownderOfItemAddress = ownerOfItem.address;

      nftItemConfig = getDefaultNftItemData({
        ownerAddress: ownderOfItemAddress,
      });

      nftItem = NftItem.createFromConfig(nftItemConfig, code);
      contract = blockchain.openContract(nftItem);
      const deployResult = await contract.sendDeploy(deployer.getSender(), toNano("0.5"));

      expect(deployResult.transactions).toHaveTransaction({
        from: deployer.address,
        to: contract.address,
        deploy: true,
        aborted: false,
      });
    });

    afterEach(() => {
      nftItemConfig = null;
      blockchain = null;
      contract = null;
      nftItem = null;
      ownerOfItem = null;
    });

    it("should return item data", async () => {
      let res = await contract!.getData();

      if (!res.isInitialized) {
        throw new Error();
      }

      expect(res.isInitialized).toBe(true);
      expect(res.index).toEqual(nftItemConfig!.itemIndex);
      expect(res.collectionAddress!.toString()).toEqual(nftItemConfig!.collectionAddress!.toString());
      expect(res.ownerAddress.toString()).toEqual(nftItemConfig!.ownerAddress.toString());
      expect(res.content).toEqual(nftItemConfig!.content);
    });

    it("should transfer ownership", async () => {
      let newOwner = randomAddress();

      let ownershipTransferResult = await contract!.sendTransfer(ownerOfItem!.getSender(), {
        newOwner,
        forwardAmount: toNano("0.01"),
        responseTo: randomAddress(),
      });

      expect(ownershipTransferResult.transactions).toHaveTransaction({
        from: ownerOfItem!.address,
        to: contract!.address,
        success: true,
        outMessagesCount: 2,
      });

      let res = await contract!.getData();

      if (!res.isInitialized) {
        throw new Error();
      }

      expect(res.ownerAddress.toString()).toEqual(newOwner.toString());
    });
  });
});
