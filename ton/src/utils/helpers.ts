import { WalletContractV4, TonClient, Contract} from "ton";
import { mnemonicToPrivateKey } from 'ton-crypto';

import env from "../env"

export function getClient() {
  const client = new TonClient(env.toncenter);

  return client;
}

export async function getDeployerAddress() {
  const keyPair = await mnemonicToPrivateKey(env.deployer.mnemonic);
  const wallet = WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey });

  return wallet.address;
}

export async function getSender(client: TonClient) {
  const keyPair = await mnemonicToPrivateKey(env.deployer.mnemonic);
  const wallet = WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey });
  const walletContract = client.open(wallet);

  return walletContract.sender(keyPair.secretKey);
}

export function getProvider(client: TonClient, contract: Contract) {
  return client.provider(contract.address, contract.init ?? null);
}

