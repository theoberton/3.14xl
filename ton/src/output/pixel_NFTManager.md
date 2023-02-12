# TACT Compilation Report
Contract: NftManager
BOC Size: 800 bytes

# Types
Total Types: 12

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

## DeployNftCollection
TLB: `deploy_nft_collection#392083ad content:^cell nft_item_code:^cell nft_collection_code:^cell royalty:RoyaltyParams{royalty_factor:uint16,roaylty_base:uint16,roaylty_address:address} = DeployNftCollection`
Signature: `DeployNftCollection{content:^cell,nft_item_code:^cell,nft_collection_code:^cell,royalty:RoyaltyParams{royalty_factor:uint16,roaylty_base:uint16,roaylty_address:address}}`

## ItemContent
TLB: `_ owner:address content:^cell = ItemContent`
Signature: `ItemContent{owner:address,content:^cell}`

## Mint
TLB: `mint#00000001 query_id:uint64 item_index:uint64 amount:coins item_content:ItemContent{owner:address,content:^cell} = Mint`
Signature: `Mint{query_id:uint64,item_index:uint64,amount:coins,item_content:ItemContent{owner:address,content:^cell}}`

## MintSafe
TLB: `mint_safe#0b73b645 query_id:uint64 next_item_index:uint64 = MintSafe`
Signature: `MintSafe{query_id:uint64,next_item_index:uint64}`

# Get Methods
Total Get Methods: 2

## nft_collection_address

## owner
