import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TonWeb from 'tonweb';
import qs from 'qs';
import { toNano } from 'ton-core';
import BN from 'bn.js';

const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {apiKey: '4ff403d7763b912464241855e03d414c1deda0d73811ceb6c694d2b5f8737611'}));
const { NftCollection} = TonWeb.token.nft;
const { Address } =  TonWeb.utils;

type AsyncCallback<T> = () => Promise<T>;
function useAsync<T>(callback: AsyncCallback<T>) {
  const [state, setState] = useState<T>();

  useEffect(() => {
    callback().then(setState);
  }, [callback]);

  return state;
}

function EditionPage() {
  const { address } = useParams();
  const collection = new NftCollection(tonweb.provider, { address });

  const collectionData = useAsync(useCallback(() => collection.getCollectionData(), []));
  const content :any = useAsync(useCallback(async () => {
    console.log({ collectionData });
    if (!collectionData?.collectionContentUri) return null;
    return fetch(collectionData?.collectionContentUri).then(res => res.json())
  }, [collectionData]));
  const firstitemAddress = useAsync(useCallback(() => collection.getNftItemAddressByIndex(1), []));

  console.log({ collectionData, content });

  if (!collectionData || !content || !address) {
    return <div>loading</div>
  }

  const mint = async () => {
    const mintMessage = collection.createMintBody({
      itemIndex: collectionData.nextItemIndex,
      amount: new BN(40000000),
      itemOwnerAddress: new Address(address),
      itemContentUri: collectionData.collectionContentUri,
    });

    const mintMessageBoc = await mintMessage.toBoc(false);
    const mintBoc = TonWeb.utils.bytesToBase64(mintMessageBoc);
    const link = 'ton://' + `transfer/` + collection.address!.toString(true, true, true) + "?" + qs.stringify({
      amount: toNano('0.05'),
      bin: mintBoc,
    });

    window.open(link);
  }

  const itemsCount = (collectionData as any)?.itemsCount.toString() as string;

  return <div> 
    <div>edition {address}</div>
    <h1>{content.name}</h1>
    <div>{content.description}</div>
    <div>iterms count: {itemsCount}</div>
    <img src={content.image} style={{ objectFit: 'cover', height: '16rem'}}/>
    <button onClick={mint}>Mint</button>

    {itemsCount && <div>first item address  {firstitemAddress?.toString()}</div>}
  </div>
}


export default EditionPage;