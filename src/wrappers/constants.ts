export const NftCollectionOpcodes = {
	Mint: 1,
	BatchMint: 2,
	ChangeOwner: 3,
	EditContent: 4,
	Transfer: 0x5fcc3d14,
	OwnershipAssigned: 0x05138d91,
	Excesses: 0xd53276db,
	GetStaticData: 0x2fcb26a2,
	ReportStaticData: 0x8b771735,
	GetRoyaltyParams: 0x693d3950,
	ReportRoyaltyParams: 0xa8cb00ad,
};

export const NftItemOpcodes = {
	Transfer: 0x5fcc3d14,
	GetStaticData: 0x2fcb26a2,
	GetStaticDataResponse: 0x8b771735,
	GetRoyaltyParams: 0x693d3950,
	GetRoyaltyParamsResponse: 0xa8cb00ad,
	EditContent: 0x1a0b9d51,
	TransferEditorship: 0x1c04412a,
};

export const NftManagerOpcodes = {
	MintSafe: 1200160875,
	EditData: 2226095555,
	SetNftCollectionAddress: 435957060,
	ChangeOwnerOfCollection: 1126980855,
};
