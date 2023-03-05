# TACT Compilation Report
Contract: NftManager
BOC Size: 1667 bytes

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

## Mint
TLB: `mint#00000001 query_id:uint64 item_index:uint64 item_value:coins item_content:^cell = Mint`
Signature: `Mint{query_id:uint64,item_index:uint64,item_value:coins,item_content:^cell}`

## UpdateContent
TLB: `update_content#00000004 query_id:uint64 collection_content:^cell = UpdateContent`
Signature: `UpdateContent{query_id:uint64,collection_content:^cell}`

## MintSafe
TLB: `mint_safe#c6159a72 query_id:uint64 next_item_index:uint64 item_owner:address = MintSafe`
Signature: `MintSafe{query_id:uint64,next_item_index:uint64,item_owner:address}`

## EditData
TLB: `edit_data#84af85c3 query_id:uint64 content:^cell mint_price:uint64 mint_date_start:uint32 mint_date_end:uint32 payout_address:address = EditData`
Signature: `EditData{query_id:uint64,content:^cell,mint_price:uint64,mint_date_start:uint32,mint_date_end:uint32,payout_address:address}`

## ChangeOwnerOfCollection
TLB: `change_owner_of_collection#432c5cf7 new_owner:address = ChangeOwnerOfCollection`
Signature: `ChangeOwnerOfCollection{new_owner:address}`

## SetNftCollectionAddress
TLB: `set_nft_collection_address#19fc2d44 nft_collection_address:address = SetNftCollectionAddress`
Signature: `SetNftCollectionAddress{nft_collection_address:address}`

## ManagerData
TLB: `_ owner:address nft_collection_address:address mint_price:coins max_supply:uint32 mint_date_start:uint32 mint_date_end:uint32 payout_address:address = ManagerData`
Signature: `ManagerData{owner:address,nft_collection_address:address,mint_price:coins,max_supply:uint32,mint_date_start:uint32,mint_date_end:uint32,payout_address:address}`

## Excesses
TLB: `excesses#d53276db query_id:uint64 = Excesses`
Signature: `Excesses{query_id:uint64}`

# Get Methods
Total Get Methods: 3

## nft_collection_address

## get_manager_data

## owner
