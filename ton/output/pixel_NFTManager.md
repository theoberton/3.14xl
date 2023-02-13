# TACT Compilation Report
Contract: NftManager
BOC Size: 1110 bytes

# Types
Total Types: 14

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## RoyaltyParams
TLB: `_ royalty_factor:uint16 roaylty_base:uint16 roaylty_address:address = RoyaltyParams`
Signature: `RoyaltyParams{royalty_factor:uint16,roaylty_base:uint16,roaylty_address:address}`

## CollectionInitData
TLB: `_ owner:address next_item_index:uint64 content:^cell nft_item_code:^cell royalty:RoyaltyParams{royalty_factor:uint16,roaylty_base:uint16,roaylty_address:address} = CollectionInitData`
Signature: `CollectionInitData{owner:address,next_item_index:uint64,content:^cell,nft_item_code:^cell,royalty:RoyaltyParams{royalty_factor:uint16,roaylty_base:uint16,roaylty_address:address}}`

## ItemContent
TLB: `_ owner:address content:^cell = ItemContent`
Signature: `ItemContent{owner:address,content:^cell}`

## Mint
TLB: `mint#00000001 query_id:uint64 item_index:uint64 amount:coins item_content:ItemContent{owner:address,content:^cell} = Mint`
Signature: `Mint{query_id:uint64,item_index:uint64,amount:coins,item_content:ItemContent{owner:address,content:^cell}}`

## MintSafe
TLB: `mint_safe#27ded405 query_id:uint64 next_item_index:uint64 itemContent:^cell = MintSafe`
Signature: `MintSafe{query_id:uint64,next_item_index:uint64,itemContent:^cell}`

## UpdateNftCollectionAddress
TLB: `update_nft_collection_address#a13ed7d3 nft_collection_address:address = UpdateNftCollectionAddress`
Signature: `UpdateNftCollectionAddress{nft_collection_address:address}`

## DeployNftCollection
TLB: `deploy_nft_collection#25ba7578 query_id:int257 = DeployNftCollection`
Signature: `DeployNftCollection{query_id:int257}`

## NftCollectionInit
TLB: `_ content:^cell nft_item_code:^cell royalty:RoyaltyParams{royalty_factor:uint16,roaylty_base:uint16,roaylty_address:address} = NftCollectionInit`
Signature: `NftCollectionInit{content:^cell,nft_item_code:^cell,royalty:RoyaltyParams{royalty_factor:uint16,roaylty_base:uint16,roaylty_address:address}}`

# Get Methods
Total Get Methods: 2

## nft_collection_address

## owner
