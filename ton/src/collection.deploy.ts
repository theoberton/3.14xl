import { beginCell, contractAddress, toNano } from "ton";
import { NftCollection, storeDeployOk } from "./output/pixel_NftCollection";
import { printAddress, printHeader } from "./utils/print";
import { deploy } from "./utils/deploy";
import { getDeployerAddress } from './utils/helpers';
import { setDeployedContractAddress } from './env';

(async () => {
    const deployerAddress = await getDeployerAddress();
    const content = 24n;

    const deployOkCell = beginCell().store(storeDeployOk({ $$type: 'DeployOk', queryId: 0n })).endCell();
    const init = await NftCollection.init(deployerAddress, content);
    const address = contractAddress(0, init);
    const deployAmount = toNano('0.05');
    const testnet = true;

    printHeader('NFTCollection');
    printAddress(address);
    
    // @todo: fix error on deploy
    await deploy(init, deployAmount, deployOkCell, testnet)

    // @todo: save all contracts, not just last
    setDeployedContractAddress(address.toString());
})();