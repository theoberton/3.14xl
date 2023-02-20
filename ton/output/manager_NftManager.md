# TACT Compilation Report
Contract: NftManager
BOC Size: 1056 bytes

# Types
Total Types: 10

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

## MintSafe
TLB: `mint_safe#c6159a72 query_id:uint64 next_item_index:uint64 item_owner:address = MintSafe`
Signature: `MintSafe{query_id:uint64,next_item_index:uint64,item_owner:address}`

## SetNftCollectionAddress
TLB: `set_nft_collection_address#19fc2d44 nft_collection_address:address = SetNftCollectionAddress`
Signature: `SetNftCollectionAddress{nft_collection_address:address}`

## ManagerData
TLB: `_ owner:address debug:uint16 nft_collection_address:address mint_price:coins max_supply:int257 = ManagerData`
Signature: `ManagerData{owner:address,debug:uint16,nft_collection_address:address,mint_price:coins,max_supply:int257}`

# Get Methods
Total Get Methods: 3

## nft_collection_address

## get_manager_data

## owner