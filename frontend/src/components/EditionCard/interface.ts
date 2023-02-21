export interface IEditionExampleItem {
	name: string;
	minter: string;
	img: string;
	isActive: boolean;
	price: number;
	minted: number;
	limit: number | null;
	collectionAddress?: string;
}
