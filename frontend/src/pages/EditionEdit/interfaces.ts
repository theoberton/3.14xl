export interface FormValues {
	description: string;
	media: string | null;
	validity: {
		start: Date | null;
		end: Date | null;
	};
	price: string;
	payoutAddress: string;
}

export interface CreateEditionParams {
	image: string;
	creatorAddress: string;
	price: string;
	dateStart: number;
	dateEnd: number;
}
