export interface IEditionItem {
	name: string;
	owner: string;
	content: string;
	dateStart: number;
	dateEnd: number;
	price: string;
	minted: number | null;
	limit: number | null;
	collectionAddress: string;
}
