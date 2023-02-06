# TACT Compilation Report
Contract: NftItem
BOC Size: 252 bytes

# Types
Total Types: 11

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## CollectionData
TLB: `_ nextItemIndex:int257 collectionContentUrl:^cell owner:address = CollectionData`
Signature: `CollectionData{nextItemIndex:int257,collectionContentUrl:^cell,owner:address}`

## RoyaltyParams
TLB: `_ numerator:int257 denominator:int257 destination:address = RoyaltyParams`
Signature: `RoyaltyParams{numerator:int257,denominator:int257,destination:address}`

## GetRoyaltyParams
TLB: `get_royalty_params#693d3950 queryId:uint64 = GetRoyaltyParams`
Signature: `GetRoyaltyParams{queryId:uint64}`

## ReportRoyaltyParams
TLB: `report_royalty_params#a8cb00ad queryId:uint64 numerator:uint16 denominator:uint16 destination:address = ReportRoyaltyParams`
Signature: `ReportRoyaltyParams{queryId:uint64,numerator:uint16,denominator:uint16,destination:address}`

## InitNftItem
TLB: `init_nft_item#16593175 queryId:uint64 owner:address = InitNftItem`
Signature: `InitNftItem{queryId:uint64,owner:address}`

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

# Get Methods
Total Get Methods: 3

## collection_address

## content

## owner
