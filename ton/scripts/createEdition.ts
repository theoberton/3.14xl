import { beginCell, toNano, Address, Cell } from "ton-core";
import { NftManager, DeployNftCollection, storeDeployNftCollection } from "../output/manager_NFTManager";
import { NetworkProvider } from "@ton-community/blueprint";
import TonWeb from "tonweb";

function hexToBase64(hex: string): string {
  return TonWeb.utils.bytesToBase64(TonWeb.utils.hexToBytes(hex));
}

const nftItemCode = Cell.fromBase64(hexToBase64(TonWeb.token.nft.NftItem.codeHex));
const nftCollectionCode = Cell.fromBase64(
  hexToBase64(
    "B5EE9C724102140100021F000114FF00F4A413F4BCF2C80B0102016202030202CD04050201200E0F04E7D10638048ADF000E8698180B8D848ADF07D201800E98FE99FF6A2687D20699FEA6A6A184108349E9CA829405D47141BAF8280E8410854658056B84008646582A802E78B127D010A65B509E58FE59F80E78B64C0207D80701B28B9E382F970C892E000F18112E001718112E001F181181981E0024060708090201200A0B00603502D33F5313BBF2E1925313BA01FA00D43028103459F0068E1201A44343C85005CF1613CB3FCCCCCCC9ED54925F05E200A6357003D4308E378040F4966FA5208E2906A4208100FABE93F2C18FDE81019321A05325BBF2F402FA00D43022544B30F00623BA9302A402DE04926C21E2B3E6303250444313C85005CF1613CB3FCCCCCCC9ED54002C323401FA40304144C85005CF1613CB3FCCCCCCC9ED54003C8E15D4D43010344130C85005CF1613CB3FCCCCCCC9ED54E05F04840FF2F00201200C0D003D45AF0047021F005778018C8CB0558CF165004FA0213CB6B12CCCCC971FB008002D007232CFFE0A33C5B25C083232C044FD003D0032C03260001B3E401D3232C084B281F2FFF2742002012010110025BC82DF6A2687D20699FEA6A6A182DE86A182C40043B8B5D31ED44D0FA40D33FD4D4D43010245F04D0D431D430D071C8CB0701CF16CCC980201201213002FB5DAFDA89A1F481A67FA9A9A860D883A1A61FA61FF480610002DB4F47DA89A1F481A67FA9A9A86028BE09E008E003E00B01A500C6E"
  )
);

export async function run(network: NetworkProvider) {
  const randomSeed = Math.floor(Math.random() * 10000);
  const content = beginCell().storeUint(randomSeed, 256).endCell();
  const owner = network.sender().address!;

  const myContract = await NftManager.fromInit(owner, content);
  const deployNftCollectionCell = beginCell()
    .store(
      storeDeployNftCollection({
        $$type: "DeployNftCollection",
        content,
        nft_item_code: nftItemCode,
        nft_collection_code: nftCollectionCode,
        royalty: {
          $$type: "RoyaltyParams",
          royalty_factor: 10n,
          roaylty_base: 100n,
          roaylty_address: owner,
        },
      })
    )
    .endCell();

  await network.deploy(myContract, toNano("0.05"), deployNftCollectionCell);

  const openedContract = network.open(myContract);

  console.log("Owner", await openedContract.getOwner());
}
